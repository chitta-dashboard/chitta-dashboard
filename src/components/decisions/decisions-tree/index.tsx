import S from "./decisionsTree.styled";

const DecisionsTree = () => {
  return (
    <>
      <S.DecisionsTreeBox>
        <S.Bud>
          <span></span>
        </S.Bud>
        <S.L1>
          <S.DecisionsTimestamp placement="left">Mar 28,2022, 10:30 AM</S.DecisionsTimestamp>
          <S.DecisionTitle>Group Name</S.DecisionTitle>
          <S.DecisionDescription>Certifide true copy of the resolution is been passed down</S.DecisionDescription>
          <S.ButtonsBar>
            <S.ViewBtn>View</S.ViewBtn>
            <S.DownloadBtn>
              <i>download</i>
            </S.DownloadBtn>
          </S.ButtonsBar>
        </S.L1>
        <S.L2>
          <S.DecisionsTimestamp placement="left">Mar 28,2022, 10:30 AM</S.DecisionsTimestamp>
          <S.DecisionTitle>Group Name</S.DecisionTitle>
          <S.DecisionDescription>Certifide true copy of the resolution is been passed down</S.DecisionDescription>
          <S.ButtonsBar>
            <S.ViewBtn>View</S.ViewBtn>
            <S.DownloadBtn>
              <i>download</i>
            </S.DownloadBtn>
          </S.ButtonsBar>
        </S.L2>
        <S.R1>
          <S.DecisionsTimestamp placement="right">Mar 28,2022, 10:30 AM</S.DecisionsTimestamp>
          <S.DecisionTitle>Group Name</S.DecisionTitle>
          <S.DecisionDescription>Certifide true copy of the resolution is been passed down</S.DecisionDescription>
          <S.ButtonsBar>
            <S.ViewBtn>View</S.ViewBtn>
            <S.DownloadBtn>
              <i>download</i>
            </S.DownloadBtn>
          </S.ButtonsBar>
        </S.R1>
        <S.R2>
          <S.DecisionsTimestamp placement="right">Mar 28,2022, 10:30 AM</S.DecisionsTimestamp>
          <S.DecisionTitle>Group Name</S.DecisionTitle>
          <S.DecisionDescription>Certifide true copy of the resolution is been passed down</S.DecisionDescription>
          <S.ButtonsBar>
            <S.ViewBtn>View</S.ViewBtn>
            <S.DownloadBtn>
              <i>download</i>
            </S.DownloadBtn>
          </S.ButtonsBar>
        </S.R2>
        <S.Shadow />
      </S.DecisionsTreeBox>
    </>
  );
};

export default DecisionsTree;
