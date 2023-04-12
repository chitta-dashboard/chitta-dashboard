import { Dispatch, FC, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import YesOrNoButtons from "../../buttons/yes-or-no-buttons";
import Toast from "../../../utils/toast";
import { useAdd, useEdit, useFetch } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { useAuthContext } from "../../../utils/context/auth";
import { FarmersGroup } from "../../../utils/context/farmersGroup";
import S from "./importFarmerGroupModal.styled";

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

const ImportFarmerGroupModal: FC<Props> = ({
  openModal,
  handleClose,
  newGroupNames,
  handleCloseImport,
  farmerDatas,
  count,
  setNewGroupNames,
  setInputData,
}) => {
  //constants
  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isFarmerGroupSuccess,
  } = useFetch(ENDPOINTS.farmerGroup);

  const { mutate: addFarmerGroup } = useAdd(ENDPOINTS.farmerGroup);
  const { mutate: updateFarmerGroup } = useEdit(ENDPOINTS.farmerGroup);
  const { mutate: addFarmerDetails } = useAdd(ENDPOINTS.farmerDetails);
  let existingGroup = Object.values(farmersGroupById as FarmersGroup[]).map((item) => item.groupName);
  let newdata = farmerDatas && farmerDatas.map((item) => item.group);
  let groupName = newdata && newdata.filter((item, i, ar) => ar.indexOf(item) === i);
  const groupNamesOnChip = groupName && RemoveArray(existingGroup, groupName);

  //state values
  const { addNotification } = useAuthContext();

  //functions
  const yesButtonHandler = () => {
    if (farmerDatas && isFarmerGroupSuccess && groupName) {
      let newdata = farmerDatas.map((item) => item.group);
      let groupName = newdata.filter((item, i, ar) => ar.indexOf(item) === i);
      let existingGroup = Object.values(farmersGroupById as FarmersGroup[]).map((item) => item.groupName);

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

      const finalFarmerGroup = updatedFarmerGroup.map((item) => {
        return {
          ...item,
          members: [...farmerDatas.filter((farmer) => farmer.group === item.groupName).map((name) => name.id), ...item.members],
        };
      });

      addFarmerGroup({
        data: newFarmerGroup,
        successCb: () => {
          // if (count && count > 1) {
          //   Toast({ message: `All ${newFarmerGroup.length} groups created Successfully`, type: "success" });
          // } else {
          //   Toast({ message: `${newFarmerGroup.length} group created Successfully`, type: "success" });
          // }

          addFarmerDetails({
            data: farmerDatas,
            successCb: () => {
              addNotification({ id: uuid(), message: `New ${count} farmers created.` });
              // if (count && count > 1) {
              //   Toast({ type: "success", message: `All ${count} farmers created successfully` });
              // } else {
              //   Toast({ type: "success", message: `${count} farmer created successfully` });
              // }

              updateFarmerGroup({
                editedData: finalFarmerGroup,
                successCb: () => {
                  if (count && count > 1) {
                    Toast({ message: `All groups count updated Successfully`, type: "success" });
                  } else {
                    Toast({ message: ` Group count updated Successfully`, type: "success" });
                  }

                  setNewGroupNames(undefined);
                  setInputData(undefined);
                  handleClose();
                  handleCloseImport();
                },
                errorCb: () => {
                  Toast({ type: "error", message: `Updating Farmer group request failed! please try again!` });
                },
              });
            },
            errorCb: () => {
              Toast({ type: "error", message: `Adding Farmer request failed! please try again!` });
            },
          });
        },
        errorCb: () => {
          Toast({ message: "Adding Farmer group request failed! please try again!", type: "error" });
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
