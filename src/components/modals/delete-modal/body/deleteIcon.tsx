import { Box } from "@mui/material";

import deleteIcon from "../../../../assets/images/delete-vector.svg";

import S from "./deleteModal.styled";

const DeleteIcon = () => {
  return (
    <>
      <Box>
        <S.DeleteImg src={deleteIcon} alt="" />
      </Box>
    </>
  );
};

export default DeleteIcon;
