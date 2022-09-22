import { Badge } from "@mui/material";
import { useState } from "react";

import UploadButton from "./body/uploadButton";
import Props from "../../modals/type/modalProps";
import personVector from "../../../assets/images/profile.svg";

import S from "./body/addProfile.styled";

const AddProfile = (props: Props) => {
  const [image, setImage] = useState("");

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && event.currentTarget.files[0]
      ? setImage(window.URL.createObjectURL(event.currentTarget.files[0]))
      : setImage(personVector);
  };

  return (
    <>
      <S.ProfileContainer>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<UploadButton openModal={props.openModal} profile={handleImage} />}
        >
          <S.ProfilePicture alt="profile" src={image} />
        </Badge>
      </S.ProfileContainer>
    </>
  );
};

export default AddProfile;
