import { Ref, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";

import IconWrapper from "../../utils/iconWrapper";
import ShareHolderCertificate from "../share-holder-certificate";
import FarmerDetailsForm from "./FarmerDetailsForm";

import { S } from "./farmerDetailPage.styled";
import TamilShareHolderCertificate from "../tamil-share-certificate";

const FarmerDetailPage = () => {
  const pdfForm = useRef<HTMLDivElement>();
  const pdfcertificate = useRef<HTMLDivElement>();
  const pdftamilcertificate = useRef<HTMLDivElement>();
  const navigate = useNavigate();
  // const { id } = useParams();

  const generateFarmerDetailsPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdfForm.current as HTMLDivElement,
  });

  const generateCertificatePDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdfcertificate.current as HTMLDivElement,
  });

  const generateTamilCertificatePDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdftamilcertificate.current as HTMLDivElement,
  });

  return (
    <S.FarmersDetailsMainContainer>
      <S.FarmersDetailsButtonContainer>
        <IconWrapper onClick={() => navigate(-1)}>back</IconWrapper>
        <S.ButtonAlignmentBox>
          <S.Button>Delete</S.Button>
          <S.Button
            onClick={() => {
              generateFarmerDetailsPDF();
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
      </S.FarmersDetailsButtonContainer>

      <S.InvisibleBox>
        <ShareHolderCertificate ref={pdfcertificate as Ref<HTMLDivElement> | undefined} />
        <TamilShareHolderCertificate ref={pdftamilcertificate as Ref<HTMLDivElement> | undefined} />
      </S.InvisibleBox>

      <FarmerDetailsForm ref={pdfForm} />
    </S.FarmersDetailsMainContainer>
  );
};

export default FarmerDetailPage;
