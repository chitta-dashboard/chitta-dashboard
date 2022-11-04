import React, { FC, useEffect, useState } from "react";
import FooterWrapper from "../../../custom-tables/footer";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import { useFetch } from "../../../../utils/hooks/query";
import { ENDPOINTS } from "../../../../utils/constants";

type FooterPropsType = {
  page?: number;
  handlePageCount?: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const Footer: FC<FooterPropsType> = ({ page, handlePageCount }) => {
  // const { farmersDetailsById } = useFarmerDetailsContext();
  const { pageCount } = useSelector((state: RootState) => state.farmerDetails);
  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  return (
    <FooterWrapper
      count={pageCount}
      page={page}
      handlePageCount={handlePageCount}
      totalCount={isSuccess ? Object.values(farmersDetailsById).length : 1}
      rowsPerPage={25}
    />
  );
};

export default Footer;
