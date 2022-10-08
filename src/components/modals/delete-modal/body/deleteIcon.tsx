import { Box } from "@mui/material";
import S from "./deleteModal.styled";
import deleteIcon from "../../../../assets/images/delete-vector.svg";

const DeleteIcon = () => {
  return (
    <Box>
      <S.DeleteImg src={deleteIcon} alt="" />
    </Box>
  );
};

export default DeleteIcon;
