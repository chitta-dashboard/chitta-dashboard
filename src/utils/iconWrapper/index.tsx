import React from "react";
import { S } from "./iconWrapper.styled";

const iconWrapper: React.FC<{ children: string; isGreen?: boolean }> = ({ children, isGreen }: { children: string; isGreen?: boolean }) => {
  return <S.Wrapper isGreen={isGreen}>{children}</S.Wrapper>;
};

export default iconWrapper;
