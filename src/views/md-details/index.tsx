import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { IMdDetails, useMdDetailsContext } from "../../utils/context/mdDetails";
import { farmerDetail } from "../../utils/context/farmersDetails";
import { Notification } from "../../utils/context/auth";
import { ENDPOINTS, Message } from "../../utils/constants";
import { useAdd, useFetch } from "../../utils/hooks/query";
import Toast from "../../utils/toast";
import TablePageHeader from "../../components/common-table-page-header";
import AddMdDetailsModal from "../../components/modals/new-md-details-modal";
import ConfirmationModal from "../../components/modals/confirmation-modal";
import MdDetailsTable from "../../components/tables/md-details-table";
import Loader from "../../utils/loaders/tree-loader";
import S from "./mdDetails.styled";

const MdDetails = () => {
  const {
    formatChangeSuccess: mdIsSuccess,
    result: { data: mdData },
  } = useFetch(ENDPOINTS.mdDetails);
  const {
    formatChangeSuccess: farmerIsSuccess,
    result: { data: farmersData },
  } = useFetch(ENDPOINTS.farmerDetails);
  const { mutate: addMdDetail } = useAdd(ENDPOINTS.mdDetails);

  const { setSearchFilter } = useMdDetailsContext();
  const { mutate: addMdNotification } = useAdd(ENDPOINTS.notification);
  const [addModal, setAddModal] = useState(false);
  const [filteredFarmerDetails, setFilteredFarmerDetails] = useState<farmerDetail[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  let farmerKeys = Object.keys(farmerIsSuccess && farmersData);

  useEffect(() => {
    Object.values(mdIsSuccess && farmerIsSuccess && (mdData as IMdDetails[])).forEach((item) => {
      if (farmerKeys.includes(item.farmerId as string)) {
        let index = farmerKeys.indexOf(item.farmerId as string);
        farmerKeys.splice(index, 1);
      }
      return null;
    });
    let filteredFarmerData: farmerDetail[] = [];
    farmerKeys.forEach((item) => {
      return filteredFarmerData.push(farmersData[item]);
    });
    setFilteredFarmerDetails([...filteredFarmerData]);
  }, [mdData, farmersData, mdIsSuccess, farmerIsSuccess]);

  const CustomMessage = () => {
    return (
      <S.CustomMessageDetails>
        Do you want to add{" "}
        {<S.CustomMessage>{selectedKeys.length === 1 ? farmersData[selectedKeys[0]].name : `${selectedKeys.length} farmers`}</S.CustomMessage>} on MD
        Details?
      </S.CustomMessageDetails>
    );
  };

  const handleCheckBoxSelectAll = () => {
    if (selectedKeys.length === filteredFarmerDetails.length) {
      setSelectedKeys([]);
    } else {
      let newFarmerKeys: string[] = [];
      filteredFarmerDetails.forEach((item) => !selectedKeys.includes(item.id) && newFarmerKeys.push(item.id));
      setSelectedKeys([...selectedKeys, ...newFarmerKeys]);
    }
  };

  const handleCheckBoxSelect = (value: string) => {
    if (selectedKeys.includes(value)) {
      let index = selectedKeys.indexOf(value);
      selectedKeys.splice(index, 1);
      setSelectedKeys([...selectedKeys]);
    } else {
      setSelectedKeys([...selectedKeys, value]);
    }
  };

  const handleYesAction = () => {
    let farmerData: IMdDetails[] = [];
    const notifications: Notification[] = [];
    selectedKeys.forEach((item: string) => {
      let generatedId = uuidv4();
      let farmerDetailsResult: IMdDetails = {} as IMdDetails;
      let farmerKeys = Object.keys(farmersData[item]);
      farmerDetailsResult.id = generatedId;
      farmerDetailsResult.farmerId = farmersData[item].id;
      farmerKeys.forEach((key) => {
        if (key !== "id") {
          farmerDetailsResult[key as keyof IMdDetails] = farmersData[item][key as keyof farmerDetail] as never;
        }
      });
      farmerData.push(farmerDetailsResult);

      //Notification
      let notification = {
        id: generatedId,
        image: farmersData[item].profile,
        message: Message(farmersData[item].name).addMd,
      };
      notifications.push(notification);
    });
    addMdDetail({
      data: farmerData,
      successCb: () => {
        Toast({ message: "MD Added successfully.", type: "success" });
        addMdNotification({ data: notifications });
      },
      errorCb: () => Toast({ message: "Request failed! Please try again.", type: "error" }),
    });
    setIsConfirmModalOpen(false);
    addModalHandler();
  };
  const handleNoAction = () => setIsConfirmModalOpen(false);

  const addModalHandler = () => {
    setAddModal(!addModal);
    setSelectedKeys([]);
  };

  const addButtonHandler = () => setIsConfirmModalOpen(true);

  return (
    <>
      {!farmerIsSuccess ? (
        <Loader />
      ) : (
        <S.MdDetailsContainer>
          <TablePageHeader addModalHandler={addModalHandler} searchHandler={setSearchFilter} />
          <MdDetailsTable />
        </S.MdDetailsContainer>
      )}
      <AddMdDetailsModal
        openModal={addModal}
        handleClose={addModalHandler}
        handleConfirmModal={addButtonHandler}
        handleCheckBox={handleCheckBoxSelect}
        handleCheckBoxAll={handleCheckBoxSelectAll}
        selectedFarmerKeys={selectedKeys}
        farmerDetails={filteredFarmerDetails}
      />
      <ConfirmationModal openModal={isConfirmModalOpen} confirmMessage={<CustomMessage />} handleClose={handleNoAction} yesAction={handleYesAction} />
    </>
  );
};

export default MdDetails;
