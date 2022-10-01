import { Theme, useMediaQuery } from "@mui/material";
import { FC, useContext } from "react";
import leftConnect from "../../../assets/images/leftDash.svg";
import rightConnect from "../../../assets/images/rightDash.svg";
import S from "./decisionsList.styled";
import { decisionsContext } from "../../../utils/context/decisionsContext";

export interface GroupData {
  groupName: string;
  groupTitle: string;
  groupDescription: string;
  timestamp: string;
}

const DecisionsList: FC = () => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { groupData } = useContext(decisionsContext);
  const leftData = groupData.filter((_, ind) => Number.isInteger(((ind + 1) / 2) % 2));
  const rightData = isMd ? groupData : groupData.filter((_, ind) => !Number.isInteger(((ind + 1) / 2) % 2));

  return (
    <S.MasterContainer>
      {!isMd && (
        <S.LeftContainer>
          {leftData.map((data: GroupData) => (
            <S.LContent key={data.groupName}>
              <S.ContentHeader>
                <S.ContentTitle>{data.groupName}</S.ContentTitle>
                <S.ContentViewBtn>View</S.ContentViewBtn>
                <S.ContentDownloadBtn>
                  <i>download</i>
                </S.ContentDownloadBtn>
              </S.ContentHeader>
              <S.ContentSubtitle>{data.groupTitle}</S.ContentSubtitle>
              <S.ContentBodyText>{data.groupDescription}</S.ContentBodyText>
              <S.ContentTimeStamp>{data.timestamp}</S.ContentTimeStamp>
              <img src={leftConnect} alt="svg-vector" draggable={false} />
            </S.LContent>
          ))}
        </S.LeftContainer>
      )}
      <S.Divider />
      <S.RightContainer>
        {rightData.map((data: GroupData) => (
          <S.RContent key={data.groupName}>
            <S.ContentHeader>
              <S.ContentTitle>{data.groupName}</S.ContentTitle>
              <S.ContentViewBtn>View</S.ContentViewBtn>
              <S.ContentDownloadBtn>
                <i>download</i>
              </S.ContentDownloadBtn>
            </S.ContentHeader>
            <S.ContentSubtitle>{data.groupTitle}</S.ContentSubtitle>
            <S.ContentBodyText>{data.groupDescription}</S.ContentBodyText>
            <S.ContentTimeStamp>{data.timestamp}</S.ContentTimeStamp>
            <img src={rightConnect} alt="svg-vector" draggable={false} />
          </S.RContent>
        ))}
      </S.RightContainer>
    </S.MasterContainer>
  );
};

export default DecisionsList;
