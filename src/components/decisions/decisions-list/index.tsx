import { FC } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import leftConnect from "../../../assets/images/leftDash.svg";
import rightConnect from "../../../assets/images/rightDash.svg";
import { IDecision, useDecisionsProviderContext } from "../../../utils/context/decisionsContext";
import { sortObj } from "../../../utils/constants";
import S from "./decisionsList.styled";

const DecisionsList: FC = () => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { decisions: decisionsObj } = useDecisionsProviderContext();
  const decisions = sortObj<IDecision>(Object.values(decisionsObj), "descending", "creationTime", { asDate: true });
  const leftData = decisions.filter((_: any, ind: number) => Number.isInteger(((ind + 1) / 2) % 2));
  const rightData = isMd ? decisions : decisions.filter((_: any, ind: number) => !Number.isInteger(((ind + 1) / 2) % 2));

  return (
    <S.MasterContainer>
      {!isMd && (
        <S.LeftContainer>
          {leftData.map((data: IDecision) => (
            <S.LContent key={data.id}>
              <S.ContentHeader>
                <S.ContentTitle>{data.groupName}</S.ContentTitle>
                <S.ContentViewBtn>View</S.ContentViewBtn>
                <S.ContentDownloadBtn>
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
              <S.ContentViewBtn>View</S.ContentViewBtn>
              <S.ContentDownloadBtn>
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
