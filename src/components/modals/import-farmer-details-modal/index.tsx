import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import ModalHeader from "../../custom-modal/header";
import CustomModal from "../../custom-modal";
import Toast from "../../../utils/toast";
import { useAdd } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import ConfirmationBody from "../confirmation-modal/body";
import S from "./importFarmerDetailsModal.styled";
import YesOrNoButtons from "../../buttons/yes-or-no-buttons";

interface Props {
  openModal: boolean;
  handleClose: () => void;
  count?: number;
  farmerDetailsData: Object[] | undefined;
  handleCloseImport: () => void;
}

const ImportFarmerDetailsModal: FC<Props> = ({ openModal, handleClose, count, farmerDetailsData, handleCloseImport }) => {
  const { mutate: addFarmerDetails } = useAdd(ENDPOINTS.farmerDetails);
  const { addNotification } = useAuthContext();

  const yesButtonHandler = () => {
    farmerDetailsData &&
      addFarmerDetails({
        data: farmerDetailsData,
        successCb: () => {
          addNotification({ id: uuidv4(), message: `New ${count} farmers created.` });
          Toast({ type: "success", message: `All ${count} farmers created successfully` });
          handleClose();
          handleCloseImport();
        },
        errorCb: () => {
          Toast({ type: "error", message: `error occured! please retry!` });
        },
      });
  };

  return (
    <CustomModal openModal={openModal}>
      <ModalHeader handleClose={handleClose} alignment={"center"}>
        Confirmation
      </ModalHeader>
      <S.Container>
        <ConfirmationBody
          confirmMessage={
            <>
              <S.DialogueText>
                Do you want to create all <S.Highlite>{count} </S.Highlite>farmers ?
              </S.DialogueText>
            </>
          }
        ></ConfirmationBody>
        <YesOrNoButtons
          handleClose={() => {
            handleCloseImport();
            handleClose();
          }}
          yesAction={yesButtonHandler}
        />
      </S.Container>
    </CustomModal>
  );
};

export default ImportFarmerDetailsModal;
