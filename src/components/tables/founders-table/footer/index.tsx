import { useFounderContext } from "../../../../utils/context/founders";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { pageCount, currentPage, totalPageCount, setCurrentPage } = useFounderContext();
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
