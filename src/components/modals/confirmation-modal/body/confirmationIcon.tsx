import { Box } from "@mui/material";
import successIcon from "../../../../assets/images/success.svg";
import S from "./confirmationModal.styled";

const ConfirmationIcon = () => {
  return (
    <Box>
      <S.SuccessImg src={successIcon} alt="" />
    </Box>
  );
};

export default ConfirmationIcon;
