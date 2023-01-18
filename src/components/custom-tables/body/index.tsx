import { WrapChildrenProps } from "../../../types/wrap-child-props";
import S from "./bodyWrapper.styled";

const BodyWrapper = ({ children }: WrapChildrenProps) => {
  return <S.Content>{children}</S.Content>;
};

export default BodyWrapper;
