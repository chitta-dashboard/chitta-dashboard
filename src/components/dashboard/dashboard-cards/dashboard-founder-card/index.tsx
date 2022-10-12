import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Slider from "react-slick";
import { fileValidation } from "../../../../utils/constants";
import { useFounderContext } from "../../../../utils/context/founders";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardHeader } from "../common-styles/commonStyles.styled";
import S from "./dashoardFounder.styled";
import FounderImg from "../../../../assets/images/Founder.png";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";

const DashboardFounder = () => {
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const { foundersById, editFounder } = useFounderContext();
  const hiddenFileInput: React.MutableRefObject<HTMLInputElement | any> = useRef<HTMLInputElement>();

  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots: any) => (
      <Box>
        <S.SliderDotUl> {dots} </S.SliderDotUl>
      </Box>
    ),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let isValid = e.target && fileValidation(e.target.files[0].name);
    e.target.files && isValid && setImage(window.URL.createObjectURL(e.target.files[0]));
    return false;
  };

  // this function is to clear the value of input field, so we can upload same file as many time has we want.
  const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };

  const handleIconClick = (id: string) => {
    hiddenFileInput && hiddenFileInput.current.click();
    setUserId(id);
  };

  const getURL = (id: string) => {
    let result = Object.values(foundersById).filter((item) => {
      return item.id === id ? item.profile : null;
    });
    let data = result.length > 0 ? result[0]["profile"] : undefined;
    return data;
  };

  const handleCroppedImage = (image: string) => {
    if (!image) return;
    let result = Object.values(foundersById).filter((item) => {
      return item.id === userId;
    });
    result[0]["profile"] = image;
    editFounder({ ...result[0] });
  };

  return (
    <>
      <S.FounderWrapper item sm={12} md={12} lg={5.9} xl={5.9}>
        <CardHeader>
          Founders
          <Link to="/founders">
            <i>expand-right</i>
          </Link>
        </CardHeader>
        <Slider {...settings}>
          {Object.values(foundersById).map((item) => (
            <S.FounderCard key={item.id}>
              <S.FounderImgContainer>
                <S.FounderImg src={getURL(item.id) ? getURL(item.id) : FounderImg} alt="Founder-image" />
                <S.EditBox onClick={() => handleIconClick(item.id)}>
                  <S.EditIcon>edit</S.EditIcon>
                  <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
                </S.EditBox>
              </S.FounderImgContainer>
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
