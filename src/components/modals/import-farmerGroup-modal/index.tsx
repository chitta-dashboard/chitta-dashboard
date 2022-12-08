import { Dispatch, FC, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import YesOrNoButtons from "../../buttons/yes-or-no-buttons";
import Toast from "../../../utils/toast";
import { useAdd } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { useAuthContext } from "../../../utils/context/auth";
import { FarmersGroup } from "../../../utils/context/farmersGroup";
import S from "./importFarmerGroupModal.styled";

interface Props {
  openModal: boolean;
  handleClose: () => void;
  newGroupNames?: string[] | undefined;
  handleCloseImport: () => void;
  farmerGroupDatas: FarmersGroup[] | null;
  farmerDatas: farmerDetail[] | null;
  count?: number | null;
  setNewGroupNames: Dispatch<SetStateAction<string[] | undefined>>;
  setInputData: Dispatch<SetStateAction<farmerDetail[] | undefined>>;
}

const ImportFarmerGroupModal: FC<Props> = ({
  openModal,
  handleClose,
  newGroupNames,
  handleCloseImport,
  farmerGroupDatas,
  farmerDatas,
  count,
  setNewGroupNames,
  setInputData,
}) => {
  const { mutate: addFarmerGroup } = useAdd(ENDPOINTS.farmerGroup);
  const { mutate: addFarmerDetails } = useAdd(ENDPOINTS.farmerDetails);
  const { addNotification } = useAuthContext();

  const yesButtonHandler = () => {
    if (farmerGroupDatas && farmerDatas) {
      // mutating farmerGroup while bulk import
      addFarmerGroup({
        data: farmerGroupDatas as FarmersGroup[],
        successCb: () => {
          addNotification({ id: uuid(), message: "New farmer group created" });
          Toast({ message: `All ${farmerGroupDatas.length} groups created Successfully`, type: "success" });

          addFarmerDetails({
            data: farmerDatas as farmerDetail[],
            successCb: () => {
              addNotification({ id: uuid(), message: `New ${count} farmers created.` });
              Toast({ type: "success", message: `All ${count} farmers created successfully` });
              setNewGroupNames(undefined);
              setInputData(undefined);
              handleClose();
              handleCloseImport();
            },
            errorCb: () => {
              Toast({ type: "error", message: `error occured! please retry!` });
            },
          });
        },
        errorCb: () => {
          Toast({ message: "Request failed! Please try again", type: "error" });
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
            {newGroupNames && newGroupNames.length > 0 ? newGroupNames?.map((i, index) => <S.Chips label={i} key={index} />) : "No new groups"}
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
