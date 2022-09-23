import React, { FC, Ref, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate,useParams } from 'react-router-dom'

import IconWrapper from "../../utils/iconWrapper";
import ShareHolderCertificate from "../share-holder-certificate";
import FarmerDetailsForm from "./FarmerDetailsForm";

import { S } from "./farmerDetailPage.styled";

const FarmerDetailPage: FC = () => {
  const pdfForm = useRef<HTMLDivElement>();
  const pdfcertificate = useRef<HTMLDivElement>();
  const navigate = useNavigate();
  const { id} = useParams();

  const generateFarmerDetailsPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdfForm.current as HTMLDivElement,
  });

  const generateCertificatePDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => pdfcertificate.current as HTMLDivElement,
  });

  return (
    <S.FarmersDetailsMainContainer>
      <S.FarmersDetailsButtonContainer>
        <IconWrapper onClick={() => navigate(-1)}
        >back</IconWrapper>
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
        </S.ButtonAlignmentBox>
      </S.FarmersDetailsButtonContainer>

      <div style={{ display: "none" }}>
        <ShareHolderCertificate ref={pdfcertificate as Ref<HTMLDivElement> | undefined} />
      </div>

      <FarmerDetailsForm ref={pdfForm} />
    </S.FarmersDetailsMainContainer>
  );
};

export default FarmerDetailPage;
