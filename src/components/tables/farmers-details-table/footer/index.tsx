import React from "react";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import FooterWrapper from "../../../custom-tables/footer";

const Footer = () => {
  // state values
  const { pageCount, currentPage, totalPageCount, setCurrentPage } = useFarmerDetailsContext();

  const handlePageCount = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <FooterWrapper
      count={pageCount ? pageCount : 0}
      page={currentPage}
      handlePageCount={handlePageCount}
      totalCount={totalPageCount}
      rowsPerPage={25}
    />
  );
};

export default Footer;
