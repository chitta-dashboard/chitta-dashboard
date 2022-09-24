import { useState } from "react";
import { Badge } from "@mui/material";

import ImagePreview from "../../../utils/imageCrop/imagePreview";
import Props from "../../modals/type/modalProps";
import UploadButton from "./body/uploadButton";
import { fileValidation } from "./body/fileValidation";

import S from "./body/addProfile.styled";

const AddProfile = (props: Props) => {
  // states for image & crop image

  const [image, setImage] = useState("");
  const [croppedImage, setCroppedImage] = useState<string | undefined>("");

  // handle functions for image & crop image

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let isValid = event.target.files && fileValidation(event.target.files[0].name);
    event.target.files && isValid && setImage(window.URL.createObjectURL(event.target.files[0]));
  };

  const handleCroppedImage = (image: string) => {
    setCroppedImage(image);
  };

  return (
    <>
      {/* profile image  */}

      <S.ProfileContainer>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<UploadButton openModal={props.openModal} profile={handleImage} />}
        >
          <S.ProfilePicture alt="profile" src={croppedImage} />
        </Badge>
      </S.ProfileContainer>

      {/* crop image preview */}

      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
};

export default AddProfile;
