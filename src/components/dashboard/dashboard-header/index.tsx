import React, { useRef, useState } from "react";

import SearchBar from "../../common-components/search-bar";
import SearchModal from "../../icon-modals/searchModal.tsx";

import profilePic from "../../../assets/images/profile.png";
import { Box } from "@mui/material";
import { fileValidation } from "../../../utils/constants";
import ImagePreview from "../../../utils/imageCrop/imagePreview";
import IconWrapper from "../../../utils/iconWrapper";
import { S } from "./dashboardHeader.styled";

type Props = {};

const DashboardHeader = (props: Props) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [image, setImage] = useState("");
  const [imagePic, setImagePic] = useState("");

  const hiddenFileInput: any = useRef<HTMLInputElement>();

  const openSearchHandle = () => {
    setOpenSearch(!openSearch);
  };

  const handleIconClick = () => {
    hiddenFileInput && hiddenFileInput.current.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let isValid = e.target && fileValidation(e.target.files[0].name);
    e.target.files && isValid && setImage(window.URL.createObjectURL(e.target.files[0]));
  };
  const handleCroppedImage = (image: string) => {
    setImagePic(image);
  };
  return (
    <>
      <SearchModal open={openSearch} handleClose={openSearchHandle} />
      <S.DashboardHeaderWrapper>
        <S.ProfileBox>
          <S.ImgContainer>
            <S.DshboardImg src={imagePic ? imagePic : profilePic} alt="user-profile" />
            <S.EditBox
              onClick={() => {
                handleIconClick();
              }}
            >
              <S.EditIcon>edit</S.EditIcon>
              <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} />
            </S.EditBox>
          </S.ImgContainer>
          <Box>
            <S.ProfileHeading>Hi, Arockia!</S.ProfileHeading>
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

export default DashboardHeader;
