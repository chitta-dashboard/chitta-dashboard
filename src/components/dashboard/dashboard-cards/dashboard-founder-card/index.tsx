import { Box, Typography } from "@mui/material";
import FounderImg from "../../../../assets/images/Founder.png";
import S from "./dashoardFounder.styled";
import { CardHeader } from "../common-styles/commonStyles.styled";

type Props = {};

const DashboardFounder = (props: Props) => {

  const FoundersItems = [
    {
      id: 1,
      name: "Arockiyaraj Reddy",
      age: 48,
      joinedDate: "28th Jul 2022",
    },
    
  ];
  return (
    <S.FounderWrapper item sm={12} md={12} lg={3.5} xl={3.5}>
      <CardHeader>
        Founders
        <i>expand-right</i>
      </CardHeader>
      <S.FounderCard>
        <S.FounderCardHeader>
          <S.FounderImg src={FounderImg} alt="Founder-image" />
          <S.FounderCardHeaderDetails>
            <Box>
              <S.FounderName>Arokiyaraj Reddy</S.FounderName>
              <S.FounderAge>Age: 48</S.FounderAge>
            </Box>
            <S.FounderJoinDate>Joined 28th Jul 2022</S.FounderJoinDate>
          </S.FounderCardHeaderDetails>
        </S.FounderCardHeader>
        <S.FounderCardBody>
          <Box>
            <S.FounderCardBodyLeft>கைபேசி எண்: </S.FounderCardBodyLeft>
            <S.FounderCardBodyLeft>பிறந்த தேதி:</S.FounderCardBodyLeft>
            <S.FounderCardBodyLeft>தகுதி: </S.FounderCardBodyLeft>
          </Box>
          <Box>
            <S.FounderCardBodyLeft>8940065783</S.FounderCardBodyLeft>
            <S.FounderCardBodyLeft>10/02/1969</S.FounderCardBodyLeft>
            <S.FounderCardBodyLeft>BBA, MBA</S.FounderCardBodyLeft>
          </Box>
        </S.FounderCardBody>
      </S.FounderCard>
    </S.FounderWrapper>
  );
};

export default DashboardFounder;
