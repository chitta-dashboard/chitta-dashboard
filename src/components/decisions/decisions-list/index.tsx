import { Theme, useMediaQuery } from "@mui/material";
import { FC } from "react";
import leftConnect from "../../../assets/images/leftDash.svg";
import rightConnect from "../../../assets/images/rightDash.svg";
import S from "./decisionsList.styled";

const dummyData = [
  {
    groupName: "Group - 1",
    groupTitle: "Certified true copy of the resolution passed",
    grouptDescription:
      "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
    timestamp: "Mar 16,2022, 10:30 AM",
  },
  {
    groupName: "Group - 2",
    groupTitle: "Certified true copy of the resolution passed",
    grouptDescription:
      "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent",
    timestamp: "Mar 16,2022, 10:30 AM",
  },
  {
    groupName: "Group - 3",
    groupTitle: "Certified true copy of the resolution passed",
    grouptDescription:
      "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet ingilla urna porttitor rhoncus dolor purus non enim praesent",
    timestamp: "Mar 16,2022, 10:30 AM",
  },
  {
    groupName: "Group - 4",
    groupTitle: "Certified true copy of the resolution passed",
    grouptDescription:
      "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
    timestamp: "Mar 16,2022, 10:30 AM",
  },
  {
    groupName: "Group - 5",
    groupTitle: "Certified true copy of the resolution passed",
    grouptDescription:
      "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
    timestamp: "Mar 16,2022, 10:30 AM",
  },
  {
    groupName: "Group - 6",
    groupTitle: "Certified true copy of the resolution passed",
    grouptDescription:
      "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent",
    timestamp: "Mar 16,2022, 10:30 AM",
  },
  {
    groupName: "Group - 7",
    groupTitle: "Certified true copy of the resolution passed",
    grouptDescription:
      "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
    timestamp: "Mar 16,2022, 10:30 AM",
  },
  {
    groupName: "Group - 8",
    groupTitle: "Certified true copy of the resolution passed",
    grouptDescription:
      "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent",
    timestamp: "Mar 16,2022, 10:30 AM",
  },
];
const DecisionsList: FC = () => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const leftData = dummyData.filter((_, ind) => Number.isInteger(((ind + 1) / 2) % 2));
  const rightData = isMd ? dummyData : dummyData.filter((_, ind) => !Number.isInteger(((ind + 1) / 2) % 2));

  return (
    <S.MasterContainer>
      {!isMd && (
        <S.LeftContainer>
          {leftData.map((data) => (
            <S.LContent key={data.groupName}>
              <S.ContentHeader>
                <S.ContentTitle>{data.groupName}</S.ContentTitle>
                <S.ContentViewBtn>View</S.ContentViewBtn>
                <S.ContentDownloadBtn>
                  <i>download</i>
                </S.ContentDownloadBtn>
              </S.ContentHeader>
              <S.ContentSubtitle>{data.groupTitle}</S.ContentSubtitle>
              <S.ContentBodyText>{data.grouptDescription}</S.ContentBodyText>
              <S.ContentTimeStamp>{data.timestamp}</S.ContentTimeStamp>
              <img src={leftConnect} alt="svg-vector" />
            </S.LContent>
          ))}
        </S.LeftContainer>
      )}
      <S.Divider />
      <S.RightContainer>
        {rightData.map((data) => (
          <S.RContent key={data.groupName}>
            <S.ContentHeader>
              <S.ContentTitle>{data.groupName}</S.ContentTitle>
              <S.ContentViewBtn>View</S.ContentViewBtn>
              <S.ContentDownloadBtn>
                <i>download</i>
              </S.ContentDownloadBtn>
            </S.ContentHeader>
            <S.ContentSubtitle>{data.groupTitle}</S.ContentSubtitle>
            <S.ContentBodyText>{data.grouptDescription}</S.ContentBodyText>
            <S.ContentTimeStamp>{data.timestamp}</S.ContentTimeStamp>
            <img src={rightConnect} alt="svg-vector" />
          </S.RContent>
        ))}
      </S.RightContainer>
    </S.MasterContainer>
  );
};

export default DecisionsList;
