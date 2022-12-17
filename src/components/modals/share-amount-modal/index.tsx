import { FC, Ref, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import CustomModal from "../../custom-modal";
import { useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { useFetchByPage, useFetchByParams } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
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
  const { selectedFarmers, farmerQuery, checkboxUnselectAll, setIsCircleLoading } = useFarmerDetailsContext();

  const {
    result: { data: farmersDetailsById, refetch: farmerDetailsRefetch },
    formatChangeSuccess: farmerDetailsSuccess,
  } = useFetchByParams(ENDPOINTS.farmerDetails, farmerQuery, false);

  const [shareAmount, setShareAmount] = useState(1000);
  const [loader, setLoader] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [certificateLoader, setCertificateLoader] = useState(false);
  const pdftamilcertificate = useRef<HTMLDivElement>();

  // to generate Tamil share holder certificate
  const generateTamilCertificatePDF = useReactToPrint({
    documentTitle: `Shareholder_certificate of_${farmerDetailsSuccess && selectedFarmers.map((id) => farmersDetailsById[id].name)}`,
    content: () => pdftamilcertificate.current as HTMLDivElement,
    onBeforePrint() {
      handleClose();
      setIsCircleLoading(false);
    },
    onAfterPrint() {
      checkboxUnselectAll();
    },
    onPrintError() {
      setIsCircleLoading(false);
    },
    pageStyle: `@media print {
      @page {
        size: ${!toggle ? "a5 landscape" : "a4 portrait"};
        margin: 0;
      }
    }`,
  });

  const certificateFunctionStart = async () => {
    //setLoader(!loader);
    setIsCircleLoading(true);
    let result = await farmerDetailsRefetch();
    result.isFetched &&
      setTimeout(() => {
        setCertificateLoader(!certificateLoader);
        setTimeout(() => {
          generateTamilCertificatePDF();
        }, 300);
      }, 300);
  };

  return (
    <>
      {certificateLoader && (
        <S.InvisibleDiv>
          <TamilShareHolderCertificate shareAmount={shareAmount} ref={pdftamilcertificate as Ref<HTMLDivElement> | undefined} toggle={toggle} />
        </S.InvisibleDiv>
      )}
      <CustomModal openModal={openModal} handleClose={handleClose}>
        <ModalHeader
          handleClose={() => {
            handleClose();
          }}
          alignment="warning"
        >
          Share Details
        </ModalHeader>

        {loader ? (
          <>
            <ModalBody id="" onSubmit={() => {}}>
              <ShareDetailBody setShareAmount={setShareAmount} toggle={toggle} setToggle={setToggle} />
            </ModalBody>
            <ModalFooter>
              <ShareDetailFooter handleClose={handleClose} generateTamilCertificate={certificateFunctionStart} />
            </ModalFooter>
          </>
        ) : (
          <S.LoaderContainer>
            <S.CustomCircularProgress size="3rem" />
            <p>
              Generating share holder{selectedFarmers.length === 1 ? "" : "s"} certificate{selectedFarmers.length === 1 ? "" : "s"} for selected
              farmer
              {selectedFarmers.length === 1 ? "" : "s"}
            </p>
          </S.LoaderContainer>
        )}
      </CustomModal>
    </>
  );
};

export default ShareAmountModal;
