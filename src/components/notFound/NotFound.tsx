import React, { FC } from "react";
import { S } from "./styled";

const NotFound: FC = () => (
  <S.NotFountBox>
    <S.NotFountText variant="h5">404</S.NotFountText>
    <S.NotFountText variant="h6">Page Not Found</S.NotFountText>
  </S.NotFountBox>
);

export default NotFound;
