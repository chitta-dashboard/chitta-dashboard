import { useNavigate } from "react-router-dom";
import S from "./notFound.styled";

const NotFound = () => {
  //constants
  const navigate = useNavigate();

  return (
    <S.NotFountBox>
      <S.NotFountText variant="h5">404</S.NotFountText>
      <S.NotFountText variant="h6">Page Not Found</S.NotFountText>
      <S.CustomButton onClick={() => navigate("/dashboard")}>Home</S.CustomButton>
    </S.NotFountBox>
  );
};

export default NotFound;
