import { FC } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import FarmerRowModalBody from "./Body/FarmerRowModalBody";
import FarmerRowModalFooter from "./Footer/FarmerRowModalFooter";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  navigateId: string;
  mdPage?: boolean;
}

const FarmerBankDetailModal: FC<CustomProps> = ({ openModal, handleClose, navigateId, mdPage = false }) => {
  const navigate = useNavigate();

  return (
    <>
      <CustomModal openModal={openModal} handleClose={handleClose}>
        <ModalHeader
          handleClose={() => {
            handleClose();
          }}
          alignment="warning"
        >
          Farmer details preview - confirmation
        </ModalHeader>

        <ModalBody id="" onSubmit={() => {}}>
          <FarmerRowModalBody />
        </ModalBody>
        <ModalFooter>
          <FarmerRowModalFooter
            handleClose={handleClose}
            generateFunction={() => {
              !mdPage ? navigate(`/farmers-details/${navigateId}`) : navigate(`/md-details/${navigateId}`);
              handleClose();
            }}
          />
        </ModalFooter>
      </CustomModal>
    </>
  );
};

export default FarmerBankDetailModal;
