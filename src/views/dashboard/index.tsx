import React, { useState } from "react";

import DashboardHeader from "../../components/dashboard/dashboard-header";
import DashboardStatCard from "../../components/dashboard/dashboard-cards/dashboard-statistics-card/index";
import DashboardSummaryCard from "../../components/dashboard/dashboard-cards/dashboard-summary-card/index";
import DashboardNotificationCard from "../../components/dashboard/dashboard-cards/dashboard-notification-card/index";

import S from "./dashboard.styled";
import AddDecisionsModal from "../../components/modals/add-decisions-modal";
import { Button } from "@mui/material";
import ModalLaunchButtons from "../../components/modals/ModalLaunchButtons";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const handleDecisions = () => {
    setOpen(!open);
  };
  return (
    <>
      <ModalLaunchButtons />
      {/* <S.DashBoaderContainer>
        <DashboardHeader />
        <S.DashBoaderBodyWrapper container>
          <DashboardStatCard />
          <DashboardSummaryCard />
          <DashboardNotificationCard />
        </S.DashBoaderBodyWrapper>
      </S.DashBoaderContainer> */}
      {/* <MyEditor /> */}
    </>
  );
};

export default Dashboard;
