import { sortObj } from "../../../utils/constants";
import { IDecision, useDecisionsProviderContext } from "../../../utils/context/decisionsContext";
import S from "./decisionsTree.styled";

const DecisionsTree = () => {
  const { decisions: decisionsObj } = useDecisionsProviderContext();
  const decisions = sortObj<IDecision>(Object.values(decisionsObj), "descending", "creationTime", { asDate: true });
  const leafCount = decisions.length <= 4 ? decisions.length : 4;

  return (
    <>
      <S.DecisionsTreeBox leafCount={leafCount}>
        <S.Bud>
          <span></span>
        </S.Bud>
        {leafCount >= 1 && (
          <S.L1>
            <S.DecisionsTimestamp placement="left">{decisions[0].timestamp}</S.DecisionsTimestamp>
            <S.DecisionTitle>{decisions[0].groupName}</S.DecisionTitle>
            <S.DecisionDescription>{decisions[0].groupTitle}</S.DecisionDescription>
            <S.ButtonsBar>
              <S.ViewBtn>View</S.ViewBtn>
              <S.DownloadBtn>
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
              <S.ViewBtn>View</S.ViewBtn>
              <S.DownloadBtn>
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
              <S.ViewBtn>View</S.ViewBtn>
              <S.DownloadBtn>
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
              <S.ViewBtn>View</S.ViewBtn>
              <S.DownloadBtn>
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
