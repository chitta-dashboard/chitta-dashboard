import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import ModalHeader from "../../custom-modal/header";
import CustomModal from "../../custom-modal";
import ModalBody from "../../custom-modal/body";
import Toast from "../../../utils/toast";
import { useAdd } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import S from "./importFarmerDetailsModal.styled";

interface Props {
  openModal: boolean;
  handleClose: () => void;
  count?: number;
  farmerDetailsData: Object[] | undefined;
}

const ImportFarmerDetailsModal: FC<Props> = ({ openModal, handleClose, count, farmerDetailsData }) => {
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
        },
        errorCb: () => {
          Toast({ type: "error", message: `error occured! please retry!` });
        },
      });
  };

  return (
    <CustomModal openModal={openModal}>
      <ModalHeader handleClose={handleClose}>Add farmer details</ModalHeader>
      <ModalBody>Do you want to create all {count} farmers ?</ModalBody>
      <S.ButtonContainer >
        <S.NoButton onClick={handleClose}>No</S.NoButton>
        <S.YesButton onClick={yesButtonHandler}>Yes</S.YesButton>
      </S.ButtonContainer>
    </CustomModal>
  );
};

export default ImportFarmerDetailsModal;
