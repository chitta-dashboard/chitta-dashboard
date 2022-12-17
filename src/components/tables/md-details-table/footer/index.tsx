import { useMdDetailsContext } from "../../../../utils/context/mdDetails";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { pageCount, currentPage, totalPageCount, setCurrentPage } = useMdDetailsContext();

  const handlePageCount = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <FooterWrapper
      count={pageCount ? pageCount : 1}
      page={currentPage}
      totalCount={totalPageCount}
      handlePageCount={handlePageCount}
      rowsPerPage={7}
    />
  );
};

export default Footer;
