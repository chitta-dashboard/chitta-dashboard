import { FC, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { Founders } from "../../../utils/context/founders";
import { IMdDetails } from "../../../utils/context/mdDetails";
import CustomModal from "../../custom-modal";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import ModalHeader from "../../custom-modal/header";
import IdCardBody from "../../id-card/id-card-body";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cardData?: IMdDetails | Founders | farmerDetail;
}

const IdCardModal: FC<CustomProps> = ({ openModal, handleClose, cardData }) => {
  const idCardRef = useRef<HTMLDivElement>();

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
