import React, { useState } from "react";

import { S } from "./dashboardSummaryCard.styled";
import { CardHeader } from "../common-styles/commonStyles.styled";

import SummaryChart from "./summary-chart/index";
import OptionCard from "./option-card/index";
import { Box } from "@mui/system";

type Props = {};

const DashboardSummaryCard = (props: Props) => {
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);

  const optionHandler = () => {
    let value = isOptionOpen === true ? false : true;
    setIsOptionOpen(value);
  };

  return (
    <>
      <S.SummaryCardWrapper item sm={10.5} md={5} lg={5} xl={5}>
        <CardHeader>
          Summary
          <i onClick={() => optionHandler()}>three-dots</i>
          {isOptionOpen && <OptionCard />}
        </CardHeader>
        <SummaryChart />
      </S.SummaryCardWrapper>
    </>
  );
};

export default DashboardSummaryCard;
