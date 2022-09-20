import S from "./iconWrapper.styled";

interface Props {
  children: string;
  isGreen?: boolean;
}

const IconWrapper: React.FC<Props> = ({ children, isGreen }) => {
  return <S.Wrapper isGreen={isGreen}>{children}</S.Wrapper>;
};

export default IconWrapper;
