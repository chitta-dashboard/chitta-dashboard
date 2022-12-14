import { useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  const { pageCount, currentPage, totalPageCount, setCurrentPage } = useFarmersGroupContext();
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
