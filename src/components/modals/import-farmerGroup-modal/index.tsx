import { Dispatch, FC, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import S from "./importFarmerGroupModal.styled";
import { ENDPOINTS } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import { farmerDetail, useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { FarmersGroup } from "../../../utils/context/farmersGroup";
import { useAdd, useEdit, useFetch } from "../../../utils/hooks/query";
import Toast from "../../../utils/toast";
import YesOrNoButtons from "../../buttons/yes-or-no-buttons";
import CustomModal from "../../custom-modal";
import ModalBody from "../../custom-modal/body";
import ModalHeader from "../../custom-modal/header";

interface Props {
  openModal: boolean;
  handleClose: () => void;
  newGroupNames?: string[];
  handleCloseImport: () => void;
  farmerDatas: farmerDetail[] | null;
  count?: number | null;
  setNewGroupNames: Dispatch<SetStateAction<string[] | undefined>>;
  setInputData: Dispatch<SetStateAction<farmerDetail[] | undefined>>;
}

const RemoveArray = (farmerId: string[], members: string[]) => {
  if (members.length === 0) {
    return [];
  }
  let finalArr = members.filter((item) => !farmerId.includes(item));
  return finalArr;
};

const ImportFarmerGroupModal: FC<Props> = ({ openModal, handleClose, handleCloseImport, farmerDatas, count, setNewGroupNames, setInputData }) => {
  // constants
  const toasId = "toasId";
  //state values
  const { currentPage } = useFarmerDetailsContext();
  const { addNotification } = useAuthContext();
  // queries
  const queryClient = useQueryClient();
  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);

  const {
    result: { data: farmerDetaisById },
    formatChangeSuccess: isFarmerDetailsSuccess,
  } = useFetch(ENDPOINTS.farmerDetails);
  const { mutate: addFarmerGroup } = useAdd(ENDPOINTS.farmerGroup);
  const { mutate: updateFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const { mutate: addFarmerDetails } = useAdd(ENDPOINTS.farmerDetails);

  let existingGroup = Object.values(farmersGroupById as FarmersGroup[]).map((item) => item.groupName);
  let newdata = farmerDatas && farmerDatas.map((item) => item.group);
  let groupName = newdata && newdata.filter((item, i, ar) => ar.indexOf(item) === i);
  const groupNamesOnChip = groupName && RemoveArray(existingGroup, groupName);

  const yesButtonHandler = () => {
    if (farmerDatas && isFarmerGroupSuccess && isFarmerDetailsSuccess && groupName) {
      const grouptobeadded = RemoveArray(existingGroup, groupName);
      const newFarmerGroup = grouptobeadded.map((item) => {
        return {
          id: uuid(),
          groupName: item,
          explanation: "",
          chairman: "",
          treasurer: "",
          secretary: "",
          members: [],
        };
      });

      let updatedFarmerGroup = Object.values(farmersGroupById).concat(newFarmerGroup) as FarmersGroup[];
      let updatedFarmerDetail = Object.values(farmerDetaisById).concat(farmerDatas) as farmerDetail[];

      const finalFarmerGroup = updatedFarmerGroup.map((item) => {
        return {
          ...item,
          members: updatedFarmerDetail
            .filter((name) => name.group === item.groupName)
            .map((item1) => item1.id)
            .filter((item, i, ar) => ar.indexOf(item) === i),
        };
      });

      addFarmerGroup({
        data: newFarmerGroup,
        successCb: () => {
          if (count && count > 1) {
            Toast({
              message: `All ${newFarmerGroup.length} groups created Successfully`,
              type: "success",
              customId: `${toasId}-groupsCreationSuccess`,
            });
          } else {
            Toast({ message: `${newFarmerGroup.length} group created Successfully`, type: "success", customId: `${toasId}-groupCreationSuccess` });
          }

          addFarmerDetails({
            data: farmerDatas,
            successCb: () => {
              setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: [`${ENDPOINTS.farmerDetails}-fetch-${currentPage}`] });
              }, 0);
              addNotification({ id: uuid(), message: `New ${count} farmers created.` });
              if (count && count > 1) {
                Toast({ type: "success", message: `All ${count} farmers created successfully`, customId: `${toasId}-farmersCreation` });
              } else {
                Toast({ type: "success", message: `${count} farmer created successfully`, customId: `${toasId}-farmerCreation` });
              }

              updateFarmerGroup({
                editedData: finalFarmerGroup,
                successCb: () => {
                  if (count && count > 1) {
                    Toast({ message: `All groups count updated Successfully`, type: "success", customId: `${toasId}-groupsCount` });
                  } else {
                    Toast({ message: ` Group count updated Successfully`, type: "success", customId: `${toasId}-groupCount` });
                  }

                  setNewGroupNames(undefined);
                  setInputData(undefined);
                  handleClose();
                  handleCloseImport();
                },
                errorCb: () => {
                  Toast({ type: "error", message: `error occured! please retry!`, customId: `${toasId}-errorOccur` });
                },
              });
            },
            errorCb: () => {
              Toast({ type: "error", message: `error occured! please retry!`, customId: `${toasId}-errorFail` });
            },
          });
        },
        errorCb: () => {
          Toast({ message: "Request failed, please try again.", type: "error", customId: `${toasId}-errorFirst` });
        },
      });
    }
  };

  return (
    <CustomModal openModal={openModal}>
      <ModalHeader handleClose={handleClose} alignment={"center"}>
        Confirmation
      </ModalHeader>
      <ModalBody>
        <S.Contents>
          <S.DialogueText>
            Do you want to create the following farmer groups & <S.Highlite>{count}</S.Highlite> farmer details?
          </S.DialogueText>
          <S.ChipContainer>
            {groupNamesOnChip && groupNamesOnChip.length > 0
              ? groupNamesOnChip?.map((i, index) => <S.Chips label={i} key={index} />)
              : "No new groups"}
          </S.ChipContainer>
          <S.ButtonContainer>
            <YesOrNoButtons
              yesAction={yesButtonHandler}
              handleClose={() => {
                handleCloseImport();
                handleClose();
              }}
            />
          </S.ButtonContainer>
        </S.Contents>
      </ModalBody>
    </CustomModal>
  );
};

export default ImportFarmerGroupModal;
