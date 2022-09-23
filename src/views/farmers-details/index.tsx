import React from "react";
import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details-table";
import { FarmerDetailsContextProvider } from "../../utils/context/farmers-details";

import S from "./farmersDetails.styled";

const FarmersDetails = () => {
  return (
    <FarmerDetailsContextProvider>
      <S.FarmersDetailsContainer>
        <FarmersDetailsTablePageHeader />
        <FarmersDetailsTable />
      </S.FarmersDetailsContainer>
    </FarmerDetailsContextProvider>
  );
};

export default FarmersDetails;
