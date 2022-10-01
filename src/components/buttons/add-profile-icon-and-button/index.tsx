import { FC, useState } from "react";
import { Badge } from "@mui/material";

import ImagePreview from "../../../utils/imageCrop/imagePreview";
import UploadButton from "./body/uploadButton";
import { fileValidation } from "./body/fileValidation";

import S from "./body/addProfile.styled";

interface CustomProps {
  ImageHandler?: () => void;
}

const AddProfile: FC<CustomProps> = ({ ImageHandler }) => {
  const [image, setImage] = useState("");
  const [croppedImage, setCroppedImage] = useState<string | undefined>("");

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
          badgeContent={<UploadButton ImageHandler={handleImage} />}
        >
          <S.ProfilePicture alt="profile" src={croppedImage} />
        </Badge>
      </S.ProfileContainer>

      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
};

export default AddProfile;
