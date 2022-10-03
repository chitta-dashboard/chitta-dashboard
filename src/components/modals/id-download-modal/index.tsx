import { FC } from "react";
import { Button } from "@mui/material";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import IdCardBody from "../../id-card/id-card-body";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
}

const IdCardModal: FC<CustomProps> = ({ openModal, handleClose }) => {
  return (
    <>
      <CustomModal openModal={openModal} handleClose={handleClose}>
        <ModalHeader
          handleClose={() => {
            handleClose();
          }}
        >
          Preview ID Card
        </ModalHeader>
        <ModalBody id="" onSubmit={() => {}}>
          <IdCardBody/>
        </ModalBody>
        <ModalFooter>
          <Button>Download</Button>
        </ModalFooter>
      </CustomModal>
    </>
  );
};

export default IdCardModal;
