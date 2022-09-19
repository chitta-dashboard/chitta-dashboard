import L1 from "../../assets/images/leaf-l1.svg";
import L2 from "../../assets/images/leaf-l2.svg";
import R1 from "../../assets/images/leaf-r1.svg";
import R2 from "../../assets/images/leaf-r2.svg";
import Bud from "../../assets/images/bud.svg";
import Shadow from "../../assets/images/shadow.svg";

import S from "./decisionsTree.styled";

const DecisionsTree = () => {
  return (
    <>
      <S.DecisionsTreeContainer>
        <S.DecisionsTreeBox>
          <S.Bud src={Bud} alt="bud" />
          <S.L1>
            <img src={L1} alt="l1" />
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
            <img src={L2} alt="l2" />
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
            <img src={R1} alt="r1" />
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
            <img src={R2} alt="r1" />
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
          <S.Shadow src={Shadow} alt="shadow" />
        </S.DecisionsTreeBox>
      </S.DecisionsTreeContainer>
    </>
  );
};

export default DecisionsTree;
