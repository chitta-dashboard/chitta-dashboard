import { wrapChildrenProps } from "../../../types/wrap-child-props";
import S from "./bodyWrapper.styled";

const BodyWrapper = ({ children }: wrapChildrenProps) => {
  return <S.Content>{children}</S.Content>;
};

export default BodyWrapper;
