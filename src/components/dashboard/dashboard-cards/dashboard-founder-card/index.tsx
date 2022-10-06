import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import Slider from "react-slick";

import { CardHeader } from "../common-styles/commonStyles.styled";
import { fileValidation } from "../../../../utils/constants";

import FounderImg from "../../../../assets/images/Founder.png";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import S from "./dashoardFounder.styled";
import { useFounderContext } from "../../../../utils/context/founders";

type Props = {};

const FoundersItems = [
  {
    id: "1",
    name: "Arockiyaraj Reddy",
    age: 48,
    joinedDate: "28th Jul 2022",
    img: FounderImg,
  },
  {
    id: "2",
    name: "Farmer 2",
    age: 48,
    joinedDate: "28th Jul 2022",
    img: FounderImg,
  },
];
const DashboardFounder = (props: Props) => {
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const { mdList } = useFounderContext();
  const hiddenFileInput: any = useRef<HTMLInputElement>();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let isValid = e.target && fileValidation(e.target.files[0].name);
    e.target.files && isValid && setImage(window.URL.createObjectURL(e.target.files[0]));
  };

  const handleIconClick = (id: string) => {
    hiddenFileInput && hiddenFileInput.current.click();
    setUserId(id);
  };
  const getURL = (id: string) => {
    let result = FoundersItems.filter((item) => {
      return item.id === id ? item.img : null;
    });
    let data = result.length > 0 ? result[0]["img"] : undefined;
    return data;
  };
  const handleCroppedImage = (image: string) => {
    let result = FoundersItems.filter((item) => {
      return item.id === userId;
    });
    result[0]["img"] = image;
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
