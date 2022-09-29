import React from "react";
import { IconType } from "../../types/icon-types";
import S from "./icon-styled";

const Icon = (props: { iconName: IconType }) => {
  return <S.Icon className={`nerkarthir-icon-${props.iconName}`}></S.Icon>;
};

export default Icon;
