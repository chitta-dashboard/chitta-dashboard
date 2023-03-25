import { FC, useRef } from "react";
import { Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import IdCardBody from "../../id-card/id-card-body";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { IMdDetails } from "../../../utils/context/mdDetails";
import { Founders } from "../../../utils/context/founders";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cardData?: IMdDetails | Founders | farmerDetail;
}

const IdCardModal: FC<CustomProps> = ({ openModal, handleClose, cardData }) => {
  //constants
  const idCardRef = useRef<HTMLDivElement>();

  //functions
  const generateIdCard = useReactToPrint({
    documentTitle: `CEO_${cardData && cardData.name}_IdCard`,
    content: () => idCardRef.current as HTMLDivElement,
    onAfterPrint() {
      handleClose();
    },
    pageStyle: `@media print {
      @page {
        size: 33.3rem 21rem;
        margin: 0;
      }
    }`,
  });

  return (
    <CustomModal openModal={openModal} handleClose={handleClose}>
      <ModalHeader
        handleClose={() => {
          handleClose();
        }}
      >
        ID Card Preview
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
