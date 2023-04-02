import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import SearchBar from "../../common-components/search-bar";
import SearchModal from "../../icon-modals/searchModal.tsx";
import { fileToBase64, fileValidation } from "../../../utils/constants";
import ImagePreview from "../../../utils/imageCrop/imagePreview";
import IconWrapper from "../../../utils/iconWrapper";
import placeHolderImg from "../../../assets/images/profile-placeholder.jpg";
import { S } from "./dashboardHeader.styled";

const DashboardHeader = () => {
  //state values
  const [openSearch, setOpenSearch] = useState(false);
  const [image, setImage] = useState<string>("");
  const [imagePic, setImagePic] = useState<string>(JSON.parse(localStorage.getItem("local user") as string));

  useEffect(() => {}, [image, imagePic]);

  //constants
  const hiddenFileInput: any = useRef<HTMLInputElement>();

  //functions
  const openSearchHandle = () => {
    setOpenSearch(!openSearch);
  };

  const handleIconClick = () => {
    hiddenFileInput && hiddenFileInput.current.click();
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

  const handleCroppedImage = async (image: string) => {
    if (!image) return;
    setImagePic(image);
    const LocalUserImage = await fileToBase64(image, true);
    localStorage.setItem("local user", JSON.stringify(LocalUserImage));
    setImagePic(JSON.parse(localStorage.getItem("local user") as string));
  };

  return (
    <>
      <SearchModal open={openSearch} handleClose={openSearchHandle} />
      <S.DashboardHeaderWrapper>
        <S.ProfileBox>
          <S.ImgContainer>
            <S.DshboardImg src={imagePic ? imagePic : placeHolderImg} alt="user-profile" />
            <S.EditBox
              onClick={() => {
                handleIconClick();
              }}
            >
              <S.EditIcon>edit</S.EditIcon>
              <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
            </S.EditBox>
          </S.ImgContainer>
          <Box>
            <S.ProfileHeading>Hi, Admin!</S.ProfileHeading>
            <S.ProfileSubHeading>Welcome Back.</S.ProfileSubHeading>
          </Box>
        </S.ProfileBox>
        <S.HeaderIconsBox>
          <S.SearchBarContainer>
            <SearchBar />
          </S.SearchBarContainer>
          <IconWrapper>filter</IconWrapper>
          <IconWrapper>settings</IconWrapper>
          <S.SearchIconContainer>
            <IconWrapper onClick={openSearchHandle}>search</IconWrapper>
          </S.SearchIconContainer>
        </S.HeaderIconsBox>
      </S.DashboardHeaderWrapper>
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
};

export default DashboardHeader;
