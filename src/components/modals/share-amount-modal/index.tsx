import { useReactToPrint } from "react-to-print";
import { FC, Ref, useState, useRef } from "react";
import CustomModal from "../../custom-modal";
import { useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import ShareDetailBody from "./Body/ShareDetailBody";
import ShareDetailFooter from "./Footer/ShareDetailFooter";
import TamilShareHolderCertificate from "../../../views/tamil-share-certificate";
import S from "./Body/share-amount-modal.styled";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
}

const ShareAmountModal: FC<CustomProps> = ({ openModal, handleClose }) => {
  const { checkboxUnselectAll } = useFarmerDetailsContext();

  const [shareAmount, setShareAmount] = useState(1000);
  const pdftamilcertificate = useRef<HTMLDivElement>();

  // to generate Tamil share holder certificate
  const generateTamilCertificatePDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdftamilcertificate.current as HTMLDivElement,
    onBeforePrint() {
      handleClose();
    },
    onAfterPrint() {
      checkboxUnselectAll();
    },
  });

  return (
    <>
      <S.InvisibleDiv>
        <TamilShareHolderCertificate shareAmount={shareAmount} ref={pdftamilcertificate as Ref<HTMLDivElement> | undefined} />
      </S.InvisibleDiv>
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
