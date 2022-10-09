import { wrapChildrenProps } from "../../../types/wrap-child-props";
import S from "./tableWrapper.styled";

const TableWrapper = ({ children }: wrapChildrenProps) => {
  return (
    <S.TableContainerBox>
      <S.TableBox stickyHeader aria-label="sticky table">
        {children}
      </S.TableBox>
    </S.TableContainerBox>
  );
};
export default TableWrapper;
