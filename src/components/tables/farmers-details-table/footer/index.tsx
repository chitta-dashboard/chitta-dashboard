import React from "react";
import FooterWrapper from "../../../custom-tables/footer";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../utils/store";
import { useFetch, useGetFarmersCount } from "../../../../utils/hooks/query";
import { ENDPOINTS } from "../../../../utils/constants";

const Footer = () => {
  const { pageCount, currentPage, totalPageCount, setCurrentPage } = useFarmerDetailsContext();
  const dispatch = useDispatch();
  const { pageCount, currentPage,totalPageCount } = useSelector((state: RootState) => state.farmerDetails);
  
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  const handlePageCount = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <FooterWrapper
      count={pageCount ? pageCount : 1}
      page={currentPage}
      handlePageCount={handlePageCount}
      totalCount={totalPageCount}
      rowsPerPage={25}
    />
  );
};

export default Footer;
