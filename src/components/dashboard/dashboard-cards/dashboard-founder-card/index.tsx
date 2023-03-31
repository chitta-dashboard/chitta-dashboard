import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Slider from "react-slick";
import { calculateAge, decryptText, encryptText, ENDPOINTS, fileValidation, imageCompressor } from "../../../../utils/constants";
import { Founders } from "../../../../utils/context/founders";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardHeader } from "../common-styles/commonStyles.styled";
import placeHolderImg from "../../../../assets/images/profile-placeholder.jpg";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import { useEdit, useFetch } from "../../../../utils/hooks/query";
import Loader from "../../../../utils/loaders/tree-loader";
import S from "./dashoardFounder.styled";
import { handleLoader } from "../../../../utils/helpers";

const DashboardFounder = () => {
  //state values
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [isLoader, setIsLoader] = useState(true);

  //constants
  let {
    formatChangeSuccess,
    result: { data: foundersById },
  } = useFetch(ENDPOINTS.founders);
  const { mutate: editFounder } = useEdit(ENDPOINTS.founders);
  const hiddenFileInput: React.MutableRefObject<HTMLInputElement | any> = useRef<HTMLInputElement>();

  let settings = {
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

  //functions
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement> | any) => {
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

  const handleCroppedImage = async (image: string) => {
    const profileBlob = await fetch(image).then((res) => res.blob());
    const compressedBase64 = await imageCompressor(profileBlob);
    if (!image) return;
    let result = foundersById[userId];
    const encryptedBase64 = encryptText(compressedBase64);
    editFounder({ editedData: { ...result, profile: encryptedBase64 } });
  };

  useEffect(() => {
    !formatChangeSuccess && handleLoader(setIsLoader);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatChangeSuccess]);

  return (
    <>
      <S.FounderWrapper item sm={12} md={12} lg={5.9} xl={5.9}>
        <CardHeader>
          Founders
          <Link to="/founders">
            <i>expand-right</i>
          </Link>
        </CardHeader>
        {formatChangeSuccess ? (
          <Slider {...settings}>
            {Object.values(foundersById as { [key: string]: Founders }).map((item) => {
              return (
                <S.FounderCard key={item.id}>
                  <S.FounderImgContainer>
                    <S.FounderImg src={item.profile ? decryptText(item.profile) : placeHolderImg} alt="Founder-image" />
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
                            <S.FounderAge>Age: {calculateAge(item.dob)}</S.FounderAge>
                          </Box>
                          <S.FounderJoinDate>Joined {item.joinDate}</S.FounderJoinDate>
                        </S.FounderCardHeaderDetails>
                        <S.FounderCardBody>
                          <Box>
                            <S.FounderCardBodyLeft>கைபேசி எண்: </S.FounderCardBodyLeft>
                            <S.FounderCardBodyLeft>பிறந்த தேதி:</S.FounderCardBodyLeft>
                            <S.FounderCardBodyLeft>தகுதி: </S.FounderCardBodyLeft>
                          </Box>
                          <Box>
                            <S.FounderCardBodyLeft>{item.phoneNumber}</S.FounderCardBodyLeft>
                            <S.FounderCardBodyLeft>{item.dob}</S.FounderCardBodyLeft>
                            <S.FounderCardBodyLeft>{item.qualification}</S.FounderCardBodyLeft>
                          </Box>
                        </S.FounderCardBody>
                      </S.FounderCardHeaderRight>
                    </S.FounderCardHeader>
                  </S.FounderCardContainer>
                  <S.FounderCardDescContainer>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, quo, minus dolorem molestiae alias ex sed impedit magnam
                      voluptate sapiente rem! Commodi harum excepturi soluta repudiandae eos quis cumque ab.
                    </p>
                  </S.FounderCardDescContainer>
                </S.FounderCard>
              );
            })}
          </Slider>
        ) : isLoader ? (
          <Loader />
        ) : (
          <S.NoDataFound>No Data Found!</S.NoDataFound>
        )}
      </S.FounderWrapper>

      {image && (
        <div>
          <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />
        </div>
      )}
    </>
  );
};

export default DashboardFounder;
