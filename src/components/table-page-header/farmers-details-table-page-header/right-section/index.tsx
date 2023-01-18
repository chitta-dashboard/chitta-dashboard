import { FC, useCallback, useState } from "react";
import { ENDPOINTS, Message } from "../../../../utils/constants";
import { useAdd, useEdit, useFetch } from "../../../../utils/hooks/query";
import { IMdDetails } from "../../../../utils/context/mdDetails";
import { FarmersGroup } from "../../../../utils/context/farmersGroup";
import { useAuthContext } from "../../../../utils/context/auth";
import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import Toast from "../../../../utils/toast";
import ExportCSV from "../../../export-csv-data";
import ConfirmationModal from "../../../modals/confirmation-modal";
import AddFarmersGroupModal from "../../../modals/farmers-group-modal";
import ImportFarmersModal from "../../../modals/import-farmers-modal";
import S from "./rightSection.styled";
import ShareAmountModal from "../../../modals/share-amount-modal";
interface RightSectionProps {
  addModalHandler?: () => void;
}

const RightSection: FC<RightSectionProps> = (props) => {
  const { addModalHandler } = props;
  const { formatChangeSuccess: isFarmerGroupSuccess, result } = useFetch(ENDPOINTS.farmerGroup);
  const { data: farmersGroupById } = result;
  const { addNotification } = useAuthContext();
  const { selectedFarmers, farmerId, checkboxUnselectAll, groupFilter } = useFarmerDetailsContext();
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  const {
    formatChangeSuccess: isMdDetailSuccess,
    result: { data: mdDetailsById },
  } = useFetch(ENDPOINTS.mdDetails);
  const handleExportData = () => {
    if (isSuccess) {
      let resultData: farmerDetail[] = [];
      farmerId.forEach((item: any) => resultData.push(farmersDetailsById[item]));
      return resultData;
    }
  };
  const { mutate } = useAdd(ENDPOINTS.farmerDetails);
  const { mutate: addFarmerGroup } = useAdd(ENDPOINTS.farmerGroup);
  const { mutate: updateFarmerDetails } = useEdit(ENDPOINTS.farmerDetails);
  const { mutate: updateMdDetails } = useEdit(ENDPOINTS.mdDetails);
  const { mutate: updateFarmergroup } = useEdit(ENDPOINTS.farmerGroup);
  const { mutate: addNewNotification } = useAdd(ENDPOINTS.notification);
  const [importedData, setImportedData] = useState<farmerDetail[] | null>(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openFarmerGroupModal, setOpenFarmerGroupModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState<null | string | FarmersGroup>(null);
  const [shareModal, setShareModal] = useState(false);

  handleExportData();

  //Share Amount Modal Handler
  const shareAmountModalHandler = () => {
    setShareModal(!shareModal);
  };

  const handleImport = useCallback(() => {
    mutate({
      data: importedData,
      successCb: () => {
        Toast({
          message: `${importedData?.length} new farmer${Number(importedData?.length) > 1 ? "s have" : " has"} been registered.`,
          type: "success",
        });

        addNewNotification({
          data: {
            message: `${importedData?.length} new farmer${Number(importedData?.length) > 1 ? "s have" : " has"} been registered.`,
            id: "add" + importedData![0]?.id,
          },
        });
        setImportedData(null);
        setImportModalOpen(false);
      },
      errorCb: () => {
        Toast({
          message: `Something went wrong, sorry for the inconvenience.`,
          type: "error",
        });
        setImportedData(null);
        setImportModalOpen(false);
      },
    });
  }, [importedData, mutate]);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const farmerGroupModalHandler = () => {
    setOpenFarmerGroupModal(!openFarmerGroupModal);
  };

  const farmerGroupModalOpener = (data: FarmersGroup) => {
    setOpenConfirmationModal(data);
  };

  const farmerGroupAddDataHandler = (newFarmerGroup: FarmersGroup) => {
    addFarmerGroup({
      data: newFarmerGroup,
      successCb: () => {
        setTimeout(() => {
          farmerGroupChange(newFarmerGroup.groupName, newFarmerGroup);
        }, 0);
      },
      errorCb: () => {
        Toast({ message: "Request failed, please try again.", type: "error" });
      },
    });
    addNotification({ id: `add_${newFarmerGroup.id}`, message: Message(newFarmerGroup.groupName).addFarmGroup });
  };

  const farmerGroupChange = (groupName: string, newFarmerGroup?: FarmersGroup) => {
    const data =
      isSuccess &&
      Object.values(farmersDetailsById as farmerDetail[])
        .filter((item: farmerDetail) => selectedFarmers.includes(item.id))
        .map((element) => ({ ...element, group: groupName }));

    updateFarmerDetails({
      editedData: data,
      successCb: () => {
        setTimeout(() => {
          handleMdDetails(data as farmerDetail[], groupName, newFarmerGroup);
        }, 0);
      },
      errorCb: () => {
        Toast({
          message: `Something went wrong, sorry for the inconvenience.`,
          type: "error",
        });
      },
    });
  };

  const handleMdDetails = (data: farmerDetail[], groupName: string, newFarmerGroup?: FarmersGroup) => {
    const farmersId = data.map((item) => item.id);
    const mdData = isMdDetailSuccess
      ? Object.values(mdDetailsById as IMdDetails[])
          .filter((item) => farmersId.includes(item.farmerId as string))
          .map((element) => ({ ...element, group: groupName }))
      : [];

    if (mdData && mdData.length === 0) {
      handleFarmerGroupDetails(farmersId, groupName, newFarmerGroup);
    } else {
      updateMdDetails({
        editedData: mdData,
        successCb: () => {
          setTimeout(() => {
            handleFarmerGroupDetails(farmersId, groupName, newFarmerGroup);
          }, 0);
        },
        errorCb: () => {
          Toast({
            message: `Something went wrong, sorry for the inconvenience.`,
            type: "error",
          });
        },
      });
    }
  };

  const handleFarmerGroupDetails = (farmersId: any, groupName: string, newFarmerGroup?: FarmersGroup) => {
    let farmerGroupData;
    if (newFarmerGroup) {
      farmerGroupData =
        isFarmerGroupSuccess &&
        [newFarmerGroup].concat(Object.values(farmersGroupById as FarmersGroup[])).map((item) => ({
          ...item,
          members: item.groupName === groupName ? JoinArray(farmersId, item.members) : RemoveArray(farmersId, item.members),
        }));
    } else {
      farmerGroupData =
        isFarmerGroupSuccess &&
        Object.values(farmersGroupById as FarmersGroup[]).map((item) => ({
          ...item,
          members: item.groupName === groupName ? JoinArray(farmersId, item.members) : RemoveArray(farmersId, item.members),
        }));
    }
    updateFarmergroup({
      editedData: farmerGroupData,
      successCb: () => {
        newFarmerGroup &&
          Toast({
            message: `${selectedFarmers.length} members have been added to new farmer group ${newFarmerGroup.groupName}`,
            type: "success",
          });

        !newFarmerGroup &&
          Toast({
            message: `${selectedFarmers.length} members have been added to existing farmer group ${groupName}`,
            type: "success",
          });
      },
      errorCb: () => {
        Toast({
          message: `Something went wrong at farmerGroup, sorry for the inconvenience.`,
          type: "error",
        });
      },
    });
  };

  const JoinArray = (farmerId: string[], members: string[]) => {
    let arr = farmerId.concat(members);
    let uniqueArr = arr.filter((item, position) => arr.indexOf(item) === position);
    return uniqueArr;
  };

  const RemoveArray = (farmerId: string[], members: string[]) => {
    if (members.length === 0) {
      return [];
    }
    let finalArr = members.filter((item) => !farmerId.includes(item));
    return finalArr;
  };

  return (
    <S.RightSectionContainer>
      <S.ButtonStack>
        <S.CustomBulkGroupButton
          aria-describedby={Boolean(anchorEl) ? "simple-popover" : undefined}
          onClick={handleClick}
          disabled={selectedFarmers.length <= 1}
        >
          Bulk Group
        </S.CustomBulkGroupButton>
        <S.CustomPopover
          id={Boolean(anchorEl) ? "simple-popover" : undefined}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <S.CustomPopoverList
            onClick={() => {
              farmerGroupModalHandler && farmerGroupModalHandler();
              handleClose();
            }}
          >
            <S.IconPlus>add</S.IconPlus>
            &nbsp;&nbsp; Add Group
          </S.CustomPopoverList>
          {Object.values(isFarmerGroupSuccess && (farmersGroupById as FarmersGroup)).map((group) => (
            <S.CustomPopoverList
              key={group.id}
              onClick={() => {
                setOpenConfirmationModal(group.groupName);
                handleClose();
              }}
            >
              {group.groupName}
            </S.CustomPopoverList>
          ))}
        </S.CustomPopover>
        <S.CustomButton
          disabled={
            selectedFarmers.length === 0 ||
            Object.values(farmersGroupById)
              .filter((item: any) => item.groupName === groupFilter)
              .map((item: any) => item.members)[0]?.length <= 0
          }
          onClick={() => shareAmountModalHandler()}
        >
          Share Holder
        </S.CustomButton>
        <S.CustomButton onClick={() => setImportModalOpen(true)}>Import Farmers</S.CustomButton>
        <ExportCSV name="Export Farmers" csvData={isSuccess ? (handleExportData() as farmerDetail[]) : ([] as farmerDetail[])} fileName="Farmers" />
        <S.CustomButton
          onClick={() => {
            if (addModalHandler) addModalHandler();
          }}
        >
          Add
        </S.CustomButton>
      </S.ButtonStack>
      <ConfirmationModal
        openModal={Number(importedData?.length) > 0}
        yesAction={handleImport}
        confirmMessage={
          <span>
            Do you want to register <S.HightlightText>{importedData?.length}</S.HightlightText> new farmer
            {(importedData?.length as number) > 1 ? "s" : ""}?
          </span>
        }
        handleClose={() => setImportedData(null)}
      />

      {importModalOpen && <ImportFarmersModal isOpen={true} handleClose={() => setImportModalOpen(false)} />}

      {openConfirmationModal && (
        <ConfirmationModal
          openModal={true}
          confirmMessage={
            <span>
              <>
                {typeof openConfirmationModal === "string" ? (
                  <span>
                    Do you want to register {<S.CustomMessage>{selectedFarmers.length}</S.CustomMessage>} farmers to{" "}
                    {<S.CustomMessage>{openConfirmationModal}</S.CustomMessage>} farmer group`
                  </span>
                ) : (
                  <span>
                    Do you want to create {<S.CustomMessage>{openConfirmationModal.groupName}</S.CustomMessage>} farmer group and register{" "}
                    {<S.CustomMessage>{selectedFarmers.length}</S.CustomMessage>} members to it?
                  </span>
                )}
              </>
            </span>
          }
          handleClose={() => {
            setOpenConfirmationModal(null);
            checkboxUnselectAll();
          }}
          yesAction={() => {
            if (typeof openConfirmationModal === "string") {
              farmerGroupChange(openConfirmationModal);
              setOpenConfirmationModal(null);
              checkboxUnselectAll();
            } else {
              farmerGroupAddDataHandler(openConfirmationModal);
              setOpenConfirmationModal(null);
              checkboxUnselectAll();
            }
          }}
        />
      )}
      <AddFarmersGroupModal openModal={openFarmerGroupModal} handleClose={farmerGroupModalHandler} cb={farmerGroupModalOpener} />
      {shareModal && <ShareAmountModal openModal={true} handleClose={shareAmountModalHandler} />}
    </S.RightSectionContainer>
  );
};

export default RightSection;
