import { FC, Ref, useState, useRef } from "react";

import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import ShareDetailBody from "./Body/ShareDetailBody";
import ShareDetailFooter from "./Footer/ShareDetailFooter";

import { useReactToPrint } from "react-to-print";
import TamilShareHolderCertificate from "../../../views/tamil-share-certificate";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
}

const ShareAmountModal: FC<CustomProps> = ({ openModal, handleClose }) => {
  const [shareAmount, setShareAmount] = useState(1000);
  const pdftamilcertificate = useRef<HTMLDivElement>();

  // to generate Tamil share holder certificate
  const generateTamilCertificatePDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdftamilcertificate.current as HTMLDivElement,
  });

  return (
    <>
      <div style={{ display: "none" }}>
        <TamilShareHolderCertificate shareAmount={shareAmount} ref={pdftamilcertificate as Ref<HTMLDivElement> | undefined} />
      </div>
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
          <ShareDetailBody setShareAmount={setShareAmount} />
        </ModalBody>
        <ModalFooter>
          <ShareDetailFooter handleClose={handleClose} generateTamilCertificate={() => generateTamilCertificatePDF()} />
        </ModalFooter>
      </CustomModal>
    </>
  );
};

export default ShareAmountModal;
