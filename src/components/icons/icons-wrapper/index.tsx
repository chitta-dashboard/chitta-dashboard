import { MouseEventHandler } from "react";
import { IconType } from "../../../types/icon-types";
import S from "./icons-wrapper-styled";

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
