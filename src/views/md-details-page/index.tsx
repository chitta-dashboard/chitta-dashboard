import { Ref, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import IconWrapper from "../../utils/iconWrapper";
import ShareHolderCertificate from "../share-holder-certificate";
import TamilShareHolderCertificate from "../tamil-share-certificate";
import MdDetailsForm from "./MdDetailsForm";
import S from "./md-details-page.styled";

// Design of this page is changed, so it is not currently used.
const MdDetailPage = () => {
  const pdfForm = useRef<HTMLDivElement>();
  const pdfcertificate = useRef<HTMLDivElement>();
  const pdftamilcertificate = useRef<HTMLDivElement>();
  const navigate = useNavigate();
  const { id } = useParams();

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
