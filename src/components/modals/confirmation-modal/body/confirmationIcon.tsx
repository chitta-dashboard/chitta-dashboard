import { Box } from "@mui/material";
import S from "./confirmationModal.styled";
import successIcon from "../../../../assets/images/success.svg";

const ConfirmationIcon = () => {
  return (
    <Box>
      <S.SuccessImg src={successIcon} alt="" />
    </Box>
  );
};

export default ConfirmationIcon;
