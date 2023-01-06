import { FC } from "react";
import S from "./icon-styled";
import { IconType } from "../../types/icon-types";

const Icon: FC<{
  iconName: IconType;
  clickHandler?: (event: any) => void;
  color?: boolean;
}> = ({ iconName, clickHandler, color }) => {
  return <S.Icon iscolor={color ? 1 : 0} onClick={clickHandler} className={`nerkathir-icon-${iconName}`}></S.Icon>;
};

export default Icon;
