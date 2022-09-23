import React from "react";
import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details-table";

import S from "./farmersDetails.styled";

const FarmersDetails = () => {
  return (
    <S.FarmersDetailsContainer>
      <FarmersDetailsTablePageHeader />
      <FarmersDetailsTable />
    </S.FarmersDetailsContainer>
  );
};

export default FarmersDetails;
