import { Badge } from "@mui/material";

import personVector from "../../../assets/images/profile.svg";
import AddButton from "./body/addButton";

import S from "./body/addProfile.styled";

const AddProfile = () => {
  return (
    <>
      <S.ProfileContainer>
        <Badge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} badgeContent={<AddButton />}>
          <S.ProfilePicture alt="profile" src={personVector} />
        </Badge>
      </S.ProfileContainer>
    </>
  );
};

export default AddProfile;
