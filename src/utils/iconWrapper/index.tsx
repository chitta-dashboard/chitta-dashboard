import { MouseEventHandler } from "react";
import S from "./iconWrapper.styled";

interface Props {
  children: string;
  onClick?: MouseEventHandler;
  isGreen?: boolean;
  isDummy?: boolean;
  tooltip?: string;
}

const IconWrapper: React.FC<Props> = (props) => {
  //constants
  const { children, isGreen, onClick, isDummy, tooltip } = props;
  
  return (
    <S.Wrapper isGreen={isGreen} onClick={onClick} isDummy={isDummy} title={tooltip}>
      {children}
    </S.Wrapper>
  );
};

export default IconWrapper;
