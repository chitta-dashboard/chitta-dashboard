import React, { useState } from "react";

import { S } from "./dashboardSummaryCard.styled";
import { CardHeader } from "../common-styles/commonStyles.styled";

import SummaryChart from "./summary-chart/index";
import OptionCard from "./option-card/index";

type Props = {};

const DashboardSummaryCard = (props: Props) => {
  // const [isOptionOpen, setIsOptionopen] = useState<boolean>(false);

  return (
    <>
      <S.SummaryCardWrapper sm={10} md={5} lg={5} xl={5}>
        <CardHeader>
          Summary
          <i>three-dots</i>
          <OptionCard />
        </CardHeader>
        <SummaryChart />
      </S.SummaryCardWrapper>
    </>
  );
};

export default DashboardSummaryCard;
