import { useDispatch, useSelector } from "react-redux";
import { ENDPOINTS } from "../../../../utils/constants";
import { useFetch } from "../../../../utils/hooks/query";
import { RootState } from "../../../../utils/store";
import { mdDetailActions } from "../../../../utils/store/slice/mdDetails";
import FooterWrapper from "../../../custom-tables/footer";

type FooterPropsType = {
  page?: number | undefined;
  handlePageCount?: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const Footer = () => {
  const { formatChangeSuccess: isSuccess, result } = useFetch(ENDPOINTS.mdDetails);
  const dispatch = useDispatch();
  const { pageCount, currentPage, totalPageCount } = useSelector((state: RootState) => state.mdDetails);
  const { data: mdData } = result;
  const count = Math.ceil(Object.values(isSuccess && mdData).length / 6);

  const handlePageCount = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(mdDetailActions.setCurrentPage(value));
  };

  return Object.values(isSuccess && mdData).length > 0 ? (
    <FooterWrapper
      count={pageCount ? pageCount : 1}
      page={currentPage}
      totalCount={totalPageCount}
      handlePageCount={handlePageCount}
      rowsPerPage={6}
    />
  ) : null;
};

export default Footer;
