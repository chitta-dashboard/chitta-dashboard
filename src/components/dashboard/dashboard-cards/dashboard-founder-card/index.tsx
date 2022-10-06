import { useRef, useState } from "react";

import { Box } from "@mui/material";
import Slider from "react-slick";

import { CardHeader } from "../common-styles/commonStyles.styled";
import { fileValidation } from "../../../../utils/constants";

import FounderImg from "../../../../assets/images/Founder.png";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import S from "./dashoardFounder.styled";

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

  const hiddenFileInput: any = useRef<HTMLInputElement>();

  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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
    <>
      <S.FounderWrapper item sm={12} md={12} lg={3.5} xl={3.5}>
        <CardHeader>
          Founders
          <i>expand-right</i>
        </CardHeader>
        <Slider {...settings}>
          {FoundersItems.map((item) => (
            <S.FounderCard key={item.id}>
              <S.FounderCardHeader>
                <S.FounderImgContainer>
                  <S.FounderImg src={getURL(item.id) ? getURL(item.id) : FounderImg} alt="Founder-image" />
                  <S.EditBox
                    onClick={() => {
                      handleIconClick(item.id);
                    }}
                  >
                    <S.EditIcon>edit</S.EditIcon>
                    <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} />
                  </S.EditBox>
                </S.FounderImgContainer>
                <S.FounderCardHeaderDetails>
                  <Box>
                    <S.FounderName>{item.name}</S.FounderName>
                    <S.FounderAge>Age: {item.age}</S.FounderAge>
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
          ))}
        </Slider>
      </S.FounderWrapper>
      {image && (
        <tbody>
          <tr>
            <td>
              <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default DashboardFounder;
