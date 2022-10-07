import { FC, Ref, useRef, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { sortObj } from "../../../utils/constants";
import { IDecision, useDecisionsProviderContext } from "../../../utils/context/decisionsContext";
import DecisionPdf from "../../../views/decision-certificate/DecisionPdf";
import S from "./decisionsTree.styled";

interface Props {
  decisionId: string;
  setDecisionId: Dispatch<string>;
}

const DecisionsTree: FC<Props> = ({ decisionId, setDecisionId }) => {
  const { decisions: decisionsObj } = useDecisionsProviderContext();
  const decisions = sortObj<IDecision>(Object.values(decisionsObj), "descending", "creationTime", { asDate: true });
  const leafCount = decisions.length <= 4 ? decisions.length : 4;
  const navigate = useNavigate();
  const DecisionFormPdf = useRef<HTMLDivElement>();

  const NavigateResolutionGroup = (resolutionId: string) => {
    navigate(`/board-resolution/${resolutionId}`);
  };

  // to generate pdf of decision form
  const generateDecisionPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => DecisionFormPdf.current as HTMLDivElement,
  });

  return (
    <>
      <S.InvisibleBox>
        <DecisionPdf ref={DecisionFormPdf as Ref<HTMLDivElement> | undefined} decisionId={decisionId} />
      </S.InvisibleBox>
      <S.DecisionsTreeBox leafCount={leafCount}>
        <S.Bud>
          {/* don't remove. needed for styling. */}
          <span></span>
        </S.Bud>
        {leafCount >= 1 && (
          <S.L1>
            <S.DecisionsTimestamp placement="left">{decisions[0].timestamp}</S.DecisionsTimestamp>
            <S.DecisionTitle>{decisions[0].groupName}</S.DecisionTitle>
            <S.DecisionDescription>{decisions[0].groupTitle}</S.DecisionDescription>
            <S.ButtonsBar>
              <S.ViewBtn
                onClick={() => {
                  NavigateResolutionGroup(decisions[0].id);
                }}
              >
                View
              </S.ViewBtn>
              <S.DownloadBtn
                onClick={async () => {
                  await setDecisionId(decisions[0].id);
                  generateDecisionPDF();
                }}
              >
                <i>download</i>
              </S.DownloadBtn>
            </S.ButtonsBar>
          </S.L1>
        )}
        {leafCount >= 3 && (
          <S.L2>
            <S.DecisionsTimestamp placement="left">{decisions[2].timestamp}</S.DecisionsTimestamp>
            <S.DecisionTitle>{decisions[2].groupName}</S.DecisionTitle>
            <S.DecisionDescription>{decisions[2].groupTitle}</S.DecisionDescription>
            <S.ButtonsBar>
              <S.ViewBtn
                onClick={() => {
                  NavigateResolutionGroup(decisions[2].id);
                }}
              >
                View
              </S.ViewBtn>
              <S.DownloadBtn
                onClick={async () => {
                  await setDecisionId(decisions[2].id);
                  generateDecisionPDF();
                }}
              >
                <i>download</i>
              </S.DownloadBtn>
            </S.ButtonsBar>
          </S.L2>
        )}
        {leafCount >= 2 && (
          <S.R1>
            <S.DecisionsTimestamp placement="right">{decisions[1].timestamp}</S.DecisionsTimestamp>
            <S.DecisionTitle>{decisions[1].groupName}</S.DecisionTitle>
            <S.DecisionDescription>{decisions[1].groupTitle}</S.DecisionDescription>
            <S.ButtonsBar>
              <S.ViewBtn
                onClick={() => {
                  NavigateResolutionGroup(decisions[1].id);
                }}
              >
                View
              </S.ViewBtn>
              <S.DownloadBtn
                onClick={async () => {
                  await setDecisionId(decisions[1].id);
                  generateDecisionPDF();
                }}
              >
                <i>download</i>
              </S.DownloadBtn>
            </S.ButtonsBar>
          </S.R1>
        )}
        {leafCount >= 4 && (
          <S.R2>
            <S.DecisionsTimestamp placement="right">{decisions[3].timestamp}</S.DecisionsTimestamp>
            <S.DecisionTitle>{decisions[3].groupName}</S.DecisionTitle>
            <S.DecisionDescription>{decisions[3].groupTitle}</S.DecisionDescription>
            <S.ButtonsBar>
              <S.ViewBtn
                onClick={() => {
                  NavigateResolutionGroup(decisions[3].id);
                }}
              >
                View
              </S.ViewBtn>
              <S.DownloadBtn
                onClick={async () => {
                  await setDecisionId(decisions[3].id);
                  generateDecisionPDF();
                }}
              >
                <i>download</i>
              </S.DownloadBtn>
            </S.ButtonsBar>
          </S.R2>
        )}
        <S.Shadow leafCount={leafCount} />
      </S.DecisionsTreeBox>
    </>
  );
};

export default DecisionsTree;
