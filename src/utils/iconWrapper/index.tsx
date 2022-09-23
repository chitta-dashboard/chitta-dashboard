import { MouseEventHandler } from "react";
import S from "./iconWrapper.styled";

interface Props {
  children: string;
  onClick?: MouseEventHandler;
  isGreen?: boolean;
  isDummy?: boolean;
}

const IconWrapper: React.FC<Props> = ({ children, isGreen, onClick, isDummy }) => {
  return (
    <S.Wrapper isGreen={isGreen} onClick={onClick} isDummy={isDummy}>
      {children}
    </S.Wrapper>
  );
};

export default IconWrapper;
