import { ENDPOINTS } from "../../../../utils/constants";
import { useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { useFetch } from "../../../../utils/hooks/query";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  //state values
  const { pageCount, currentPage, totalPageCount, setCurrentPage } = useMdDetailsContext();

  //constants
  const {
    formatChangeSuccess: isSuccess,
    result: { data: mdDetailsById },
  } = useFetch(ENDPOINTS.mdDetails);

  const mdKeys = mdDetailsById ? Object.keys(isSuccess && mdDetailsById) : [];

  //functions
  const handlePageCount = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return mdKeys.length > 0 ? (
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
