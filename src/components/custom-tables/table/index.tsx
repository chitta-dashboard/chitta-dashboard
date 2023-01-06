import S from "./tableWrapper.styled";
import { WrapChildrenProps } from "../../../types/wrap-child-props";

const TableWrapper = ({ children }: WrapChildrenProps) => {
  return (
    <S.TableContainerBox>
      <S.TableBox stickyHeader aria-label="sticky table">
        {children}
      </S.TableBox>
    </S.TableContainerBox>
  );
};
export default TableWrapper;
