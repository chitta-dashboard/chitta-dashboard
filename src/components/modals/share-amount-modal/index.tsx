import { FC } from "react";

import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import ShareDetailBody from "./Body/ShareDetailBody";
import ShareDetailFooter from "./Footer/ShareDetailFooter";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  generateTamilCertificate: () => void;
}

const ShareAmountModal: FC<CustomProps> = ({ openModal, handleClose, generateTamilCertificate }) => {
  return (
    <>
      <CustomModal openModal={openModal} handleClose={handleClose}>
        <ModalHeader
          handleClose={() => {
            handleClose();
          }}
          alignment="warning"
        >
          Share Details
        </ModalHeader>
        <ModalBody id="" onSubmit={() => {}}>
          <ShareDetailBody />
        </ModalBody>
        <ModalFooter>
          <ShareDetailFooter handleClose={handleClose} generateTamilCertificate={generateTamilCertificate} />
        </ModalFooter>
      </CustomModal>
    </>
  );
};

export default ShareAmountModal;
