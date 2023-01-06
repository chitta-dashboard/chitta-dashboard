import { Ref, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import S from "./md-details-page.styled";
import IconWrapper from "../../utils/iconWrapper";
import ShareHolderCertificate from "../share-holder-certificate";
import TamilShareHolderCertificate from "../tamil-share-certificate";
import MdDetailsForm from "./MdDetailsForm";

// Design of this page is changed, so it is not currently used.
const MdDetailPage = () => {
  const pdfForm = useRef<HTMLDivElement>();
  const pdfcertificate = useRef<HTMLDivElement>();
  const pdftamilcertificate = useRef<HTMLDivElement>();
  const navigate = useNavigate();

  // to generate Md detail form
  const generateMdDetailsPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdfForm.current as HTMLDivElement,
  });

  // to generate share holder certificate
  const generateCertificatePDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdfcertificate.current as HTMLDivElement,
  });

  // to generate share holder certificate in tamil
  const generateTamilCertificatePDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdftamilcertificate.current as HTMLDivElement,
  });

  return (
    <S.MdsDetailsMainContainer>
      <S.MdsDetailsButtonContainer>
        <IconWrapper onClick={() => navigate(-1)}>back</IconWrapper>
        <S.ButtonAlignmentBox>
          <S.Button>Delete</S.Button>
          <S.Button
            onClick={() => {
              generateMdDetailsPDF();
            }}
          >
            Download
          </S.Button>
          <S.Button>Edit</S.Button>
          <S.Button
            onClick={() => {
              generateCertificatePDF();
            }}
          >
            Certificate
          </S.Button>
          <S.Button
            onClick={() => {
              generateTamilCertificatePDF();
            }}
          >
            Tamil Certificate
          </S.Button>
        </S.ButtonAlignmentBox>
      </S.MdsDetailsButtonContainer>

      <S.InvisibleBox>
        <ShareHolderCertificate ref={pdfcertificate as Ref<HTMLDivElement> | undefined} />
        <TamilShareHolderCertificate ref={pdftamilcertificate as Ref<HTMLDivElement> | undefined} />
      </S.InvisibleBox>

      <MdDetailsForm ref={pdfForm} />
    </S.MdsDetailsMainContainer>
  );
};

export default MdDetailPage;
