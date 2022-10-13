import { FC } from "react";
import YesOrNoButtons from "../../buttons/yes-or-no-buttons";
import CustomModal from "../../custom-modal";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import ModalHeader from "../../custom-modal/header";
import ConfirmationBody from "./body";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  yesAction: () => void;
  confirmMessage?: JSX.Element | boolean;
}

const ConfirmationModal: FC<CustomProps> = ({ openModal, handleClose, yesAction, confirmMessage }) => {
  return (
    <CustomModal openModal={openModal} handleClose={handleClose}>
      <ModalHeader
        handleClose={() => {
          handleClose();
        }}
        alignment="center"
      >
        Confirmation
      </ModalHeader>
      <ModalBody id={""} onSubmit={() => {}}>
        <ConfirmationBody confirmMessage={confirmMessage} />
      </ModalBody>
      <ModalFooter>
        <YesOrNoButtons yesAction={yesAction} handleClose={handleClose} />
      </ModalFooter>
    </CustomModal>
  );
};
export default ConfirmationModal;
