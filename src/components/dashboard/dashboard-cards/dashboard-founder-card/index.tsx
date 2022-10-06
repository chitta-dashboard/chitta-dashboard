import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardHeader } from "../common-styles/commonStyles.styled";
import S from "./dashoardFounder.styled";
import FounderImg from "../../../../assets/images/Founder.png";
import { useFounderContext } from "../../../../utils/context/founders";

type Props = {};
const DashboardFounder = (props: Props) => {
  const { mdList } = useFounderContext();
  const FoundersItems = [
    {
      id: 1,
      name: "Arockiyaraj Reddy",
      age: 48,
      joinedDate: "28th Jul 2022",
    },
    {
      id: 2,
      name: "Farmer 2",
      age: 48,
      joinedDate: "28th Jul 2022",
    },
  ];
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    appendDots: (dots: any) => (
      <div>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };
  return (
    <S.FounderWrapper item sm={12} md={12} lg={5.9} xl={5.9}>
      <CardHeader>
        Founders
        <Link to="/md-details">
          <i>expand-right</i>
        </Link>
      </CardHeader>
      <Slider {...settings}>
        {mdList.map((item) => (
          <S.FounderCard key={item.id}>
            <S.FounderImg src={FounderImg} alt="Founder-image" />
            <S.FounderCardContainer>
              <S.FounderCardHeader>
                <S.FounderCardHeaderRight>
                  <S.FounderCardHeaderDetails>
                    <Box>
                      <S.FounderName>{item.name}</S.FounderName>
                      <S.FounderAge>Age: 22</S.FounderAge>
                    </Box>
                    <S.FounderJoinDate>Joined 28th Jul 2022</S.FounderJoinDate>
                  </S.FounderCardHeaderDetails>
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
                </S.FounderCardHeaderRight>
              </S.FounderCardHeader>
            </S.FounderCardContainer>
            <S.FounderCardDescContainer>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, quo, minus dolorem molestiae alias ex sed impedit magnam voluptate
                sapiente rem! Commodi harum excepturi soluta repudiandae eos quis cumque ab.
              </p>
            </S.FounderCardDescContainer>
          </S.FounderCard>
        ))}
      </Slider>
    </S.FounderWrapper>
  );
};

export default DashboardFounder;
