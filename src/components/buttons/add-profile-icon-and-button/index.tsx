import { Badge, FormHelperText } from "@mui/material";
import { useState } from "react";

import UploadButton from "./body/uploadButton";
import Props from "../../modals/type/modalProps";
import ImagePreview from "../../../utils/imageCrop/imagePreview";
import S from "./body/addProfile.styled";

const AddProfile = (props: Props) => {
  const [image, setImage] = useState("");
  const [croppedImage, setCroppedImage] = useState<string | undefined>("");

  const fileValidation = (file: string) => {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!allowedExtensions.exec(file)) {
      alert("Invalid file type");
      return false;
    }
    return true;
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let isValid = event.target.files && fileValidation(event.target.files[0].name);
    event.target.files && isValid && setImage(window.URL.createObjectURL(event.target.files[0]));
  };

  const handleCroppedImage = (image: string) => {
    setCroppedImage(image);
  };

  return (
    <>
      <S.ProfileContainer>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<UploadButton openModal={props.openModal} profile={handleImage} {...props.register} />}
        >
          <S.ProfilePicture alt="profile" src={croppedImage} />
        </Badge>
      </S.ProfileContainer>
      <FormHelperText>{props.error.profile?.message}</FormHelperText>
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
};

export default AddProfile;
