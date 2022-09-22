import React from "react";
import FarmersDetailsTablePageHeader from "../../components/table-page-header/farmers-details-table-page-header";
import FarmersDetailsTable from "../../components/tables/farmers-details";

import S from "./farmersDetails.styled";

const FarmersGroup = () => {
  return (
    <S.FarmersDetailsContainer>
      <FarmersDetailsTablePageHeader />
      <FarmersDetailsTable />
    </S.FarmersDetailsContainer>
  );
};

export default FarmersGroup;
