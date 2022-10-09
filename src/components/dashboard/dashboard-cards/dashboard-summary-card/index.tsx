import { useState } from "react";
import SummaryChart from "./summary-chart/index";
import OptionCard from "./option-card/index";
import { CardHeader } from "../common-styles/commonStyles.styled";
import { S } from "./dashboardSummaryCard.styled";

const DashboardSummaryCard = () => {
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);

  const optionHandler = () => {
    let value = isOptionOpen === true ? false : true;
    setIsOptionOpen(value);
  };

  return (
    <S.SummaryCardWrapper item sm={12} md={12} lg={5.9} xl={5.9}>
      <CardHeader>
        Summary
        <i onClick={() => optionHandler()}>three-dots</i>
        {isOptionOpen && <OptionCard />}
      </CardHeader>
      <SummaryChart />
    </S.SummaryCardWrapper>
  );
};

export default DashboardSummaryCard;
