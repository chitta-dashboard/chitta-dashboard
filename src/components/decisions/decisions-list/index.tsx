import { Dispatch, FC, Ref, useRef } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { IDecision, useDecisionsProviderContext } from "../../../utils/context/decisionsContext";
import { sortObj } from "../../../utils/constants";
import S from "./decisionsList.styled";
import DecisionPdf from "../../../views/decision-certificate/DecisionPdf";
import rightConnect from "../../../assets/images/rightDash.svg";
import leftConnect from "../../../assets/images/leftDash.svg";

interface Props {
  decisionId: string;
  setDecisionId: Dispatch<string>;
}

const DecisionsList: FC<Props> = ({ decisionId, setDecisionId }) => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { decisions: decisionsObj } = useDecisionsProviderContext();
  const navigate = useNavigate();
  const DecisionFormPdf = useRef<HTMLDivElement>();
  const decisions = sortObj<IDecision>(Object.values(decisionsObj), "descending", "creationTime", { asDate: true });
  const leftData = decisions.filter((_: any, ind: number) => Number.isInteger(((ind + 1) / 2) % 2));
  const rightData = isMd ? decisions : decisions.filter((_: any, ind: number) => !Number.isInteger(((ind + 1) / 2) % 2));

  const NavigateResolutionGroup = (resolutionId: string) => {
    navigate(`/board-resolution/${resolutionId}`);
  };

  // to generate pdf of decision form
  const generateDecisionPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => DecisionFormPdf.current as HTMLDivElement,
  });

  return (
    <S.MasterContainer>
      <S.InvisibleBox>
        <DecisionPdf ref={DecisionFormPdf as Ref<HTMLDivElement> | undefined} decisionId={decisionId} />
      </S.InvisibleBox>
      {!isMd && (
        <S.LeftContainer>
          {leftData.map((data: IDecision) => (
            <S.LContent key={data.id}>
              <S.ContentHeader>
                <S.ContentTitle>{data.groupName}</S.ContentTitle>
                <S.ContentViewBtn
                  onClick={() => {
                    NavigateResolutionGroup(data.id);
                  }}
                >
                  View
                </S.ContentViewBtn>
                <S.ContentDownloadBtn
                  onClick={async () => {
                    await setDecisionId(data.id);
                    generateDecisionPDF();
                  }}
                >
                  <i>download</i>
                </S.ContentDownloadBtn>
              </S.ContentHeader>
              <S.ContentSubtitle>{data.groupTitle}</S.ContentSubtitle>
              <S.ContentBodyText dangerouslySetInnerHTML={{ __html: data?.groupDescriptionRichText || data.groupDescription }} />
              <S.ContentTimeStamp>{data.timestamp}</S.ContentTimeStamp>
              <img src={leftConnect} alt="svg-vector" draggable={false} />
            </S.LContent>
          ))}
        </S.LeftContainer>
      )}
      <S.Divider />
      <S.RightContainer>
        {rightData.map((data: IDecision) => (
          <S.RContent key={data.id}>
            <S.ContentHeader>
              <S.ContentTitle>{data.groupName}</S.ContentTitle>
              <S.ContentViewBtn
                onClick={() => {
                  NavigateResolutionGroup(data.id);
                }}
              >
                View
              </S.ContentViewBtn>
              <S.ContentDownloadBtn
                onClick={async () => {
                  await setDecisionId(data.id);
                  generateDecisionPDF();
                }}
              >
                <i>download</i>
              </S.ContentDownloadBtn>
            </S.ContentHeader>
            <S.ContentSubtitle>{data.groupTitle}</S.ContentSubtitle>
            <S.ContentBodyText dangerouslySetInnerHTML={{ __html: data?.groupDescriptionRichText || data.groupDescription }} />
            <S.ContentTimeStamp>{data.timestamp}</S.ContentTimeStamp>
            <img src={rightConnect} alt="svg-vector" draggable={false} />
          </S.RContent>
        ))}
      </S.RightContainer>
    </S.MasterContainer>
  );
};

export default DecisionsList;
