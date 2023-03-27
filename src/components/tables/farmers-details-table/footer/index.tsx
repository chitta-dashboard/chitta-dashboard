import React from "react";
import FooterWrapper from "../../../custom-tables/footer";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { useFetch } from "../../../../utils/hooks/query";
import { ENDPOINTS } from "../../../../utils/constants";

const Footer = () => {
  //state values
  const { pageCount, currentPage, totalPageCount, setCurrentPage } = useFarmerDetailsContext();

  //constants
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);

  //functions
  const handlePageCount = (event: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value);

  return Object.values(isSuccess && farmersDetailsById).length > 0 ? (
    <FooterWrapper
      count={pageCount ? pageCount : 1}
      page={currentPage}
      handlePageCount={handlePageCount}
      totalCount={totalPageCount}
      rowsPerPage={25}
    />
  ) : null;
};

export default Footer;
