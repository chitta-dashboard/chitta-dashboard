import { FC } from "react";
import CustomModal from "../../custom-modal";
import YesOrNoButtons from "../../buttons/yes-or-no-buttons";
import DeleteBody from "./body";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  deleteMessage?: JSX.Element;
}

const DeleteModal: FC<CustomProps> = ({ openModal, handleClose, handleDelete, deleteMessage }) => {
  return (
    <CustomModal openModal={openModal} handleClose={handleClose}>
      <ModalHeader
        handleClose={() => {
          handleClose();
        }}
        alignment="warning"
      >
        Warning
      </ModalHeader>
      <ModalBody id="" onSubmit={() => {}}>
        <DeleteBody deleteMessage={deleteMessage} />
      </ModalBody>
      <ModalFooter>
        <YesOrNoButtons yesAction={handleDelete} handleClose={handleClose} />
      </ModalFooter>
    </CustomModal>
  );
};

export default DeleteModal;
