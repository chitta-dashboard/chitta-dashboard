import React from "react";

import { Props } from "../header";

import S from "./bodyWrapper.styled";

const BodyWrapper = ({ children }: Props) => {
  return <S.Content>{children}</S.Content>;
};

export default BodyWrapper;
