import { FC, useRef } from "react";
import { Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import IdCardBody from "../../id-card/id-card-body";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { mdDetail } from "../../../utils/context/mdDetails";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cardData?: farmerDetail | mdDetail;
}

const IdCardModal: FC<CustomProps> = ({ openModal, handleClose, cardData }) => {
  const idCardRef = useRef<HTMLDivElement>();

  const generateIdCard = useReactToPrint({
    documentTitle: `Nerkathir_User_IDcard${+new Date()}`,
    content: () => idCardRef.current as HTMLDivElement,
    onAfterPrint() {
      handleClose();
    },
  });

  return (
    <CustomModal openModal={openModal} handleClose={handleClose}>
      <ModalHeader
        handleClose={() => {
          handleClose();
        }}
      >
        Preview ID Card
      </ModalHeader>
      <ModalBody>
        <IdCardBody ref={idCardRef} data={cardData} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={generateIdCard}>Download</Button>
      </ModalFooter>
    </CustomModal>
  );
};

export default IdCardModal;
