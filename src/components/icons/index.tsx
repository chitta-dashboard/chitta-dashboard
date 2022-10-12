import { FC } from "react";
import { IconType } from "../../types/icon-types";
import S from "./icon-styled";

const Icon: FC<{
  iconName: IconType;
  clickHandler?: () => void;
  color?:boolean
}> = ({ iconName, clickHandler,color }) => {
  return <S.Icon isColor={color? 1:0} onClick={clickHandler} className={`nerkathir-icon-${iconName}`}></S.Icon>;
};

export default Icon;
