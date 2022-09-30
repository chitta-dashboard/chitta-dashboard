import { useDecisionsProviderContext } from "../../../utils/context/decisionsContext";
import S from "./decisionsTree.styled";

const DecisionsTree = () => {
  const { groupData } = useDecisionsProviderContext();
  const leafCount = groupData.length <= 4 ? groupData.length : 4;

  return (
    <>
      <S.DecisionsTreeBox leafCount={leafCount}>
        <S.Bud>
          <span></span>
        </S.Bud>
        {leafCount >= 1 && (
          <S.L1>
            <S.DecisionsTimestamp placement="left">{groupData[0].timestamp}</S.DecisionsTimestamp>
            <S.DecisionTitle>{groupData[0].groupName}</S.DecisionTitle>
            <S.DecisionDescription>{groupData[0].groupTitle}</S.DecisionDescription>
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
            <S.DecisionsTimestamp placement="left">{groupData[2].timestamp}</S.DecisionsTimestamp>
            <S.DecisionTitle>{groupData[2].groupName}</S.DecisionTitle>
            <S.DecisionDescription>{groupData[2].groupTitle}</S.DecisionDescription>
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
            <S.DecisionsTimestamp placement="right">{groupData[1].timestamp}</S.DecisionsTimestamp>
            <S.DecisionTitle>{groupData[1].groupName}</S.DecisionTitle>
            <S.DecisionDescription>{groupData[1].groupTitle}</S.DecisionDescription>
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
            <S.DecisionsTimestamp placement="right">{groupData[3].timestamp}</S.DecisionsTimestamp>
            <S.DecisionTitle>{groupData[3].groupName}</S.DecisionTitle>
            <S.DecisionDescription>{groupData[3].groupTitle}</S.DecisionDescription>
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
