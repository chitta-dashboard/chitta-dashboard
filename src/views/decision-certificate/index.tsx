import { Ref, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import IconWrapper from "../../utils/iconWrapper";

import { S } from "./decision-certificate.styled";
import DecisionPdf from "./DecisionPdf";

interface Props {}

const DecisionCertificatePage = (props: Props) => {
  const navigate = useNavigate();
  const DecisionFormPdf = useRef<HTMLDivElement>();

  // to generate pdf of decision form
  const generateDecisionPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => DecisionFormPdf.current as HTMLDivElement,
  });

  return (
    <S.DecisionCertificateMainContainer>
      <S.ButtonContainer>
        <IconWrapper onClick={() => navigate(-1)}>back</IconWrapper>
        <S.ButtonAlignmentBox>
          <S.Button>Delete</S.Button>
          <S.Button
            onClick={() => {
              generateDecisionPDF();
            }}
          >
            Download
          </S.Button>
          <S.Button>Edit</S.Button>
        </S.ButtonAlignmentBox>
      </S.ButtonContainer>
      <DecisionPdf ref={DecisionFormPdf as Ref<HTMLDivElement> | undefined} />
    </S.DecisionCertificateMainContainer>
  );
};

export default DecisionCertificatePage;
