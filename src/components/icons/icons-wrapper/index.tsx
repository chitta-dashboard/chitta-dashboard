import { MouseEventHandler } from "react";
import S from "./icons-wrapper-styled";
import { IconType } from "../../../types/icon-types";

interface Props {
  iconName: IconType;
  onClick?: MouseEventHandler;
  isGreen?: boolean;
  isDummy?: boolean;
}

const IconsWrapper: React.FC<Props> = ({ iconName, isGreen, onClick, isDummy }) => {
  return <S.Wrapper className={`nerkathir-icon-${iconName}`} isGreen={isGreen} onClick={onClick} isDummy={isDummy} />;
};

export default IconsWrapper;
