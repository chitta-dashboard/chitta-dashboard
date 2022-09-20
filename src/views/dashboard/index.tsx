import React from "react";
import { Stack } from "@mui/material";
import S from "./dashboard.styled";
import DashboardHeader from "../../components/dashboard/dashboard-header";
import DashboardStatCard from "../../components/dashboard/dashboard-cards/dashboard-statistics-card/index";
import DashboardSummaryCard from "../../components/dashboard/dashboard-cards/dashboard-summary-card/index";
import DashboardNotificationCard from "../../components/dashboard/dashboard-cards/dashboard-notification-card/index";

const Dashboard = () => {
  return (
    <S.DashBoaderContainer>
      <DashboardHeader />
      <S.DashBoaderBodyWrapper container>
        <DashboardStatCard />
        <DashboardSummaryCard />
        <DashboardNotificationCard />
      </S.DashBoaderBodyWrapper>
    </S.DashBoaderContainer>
  );
};

export default Dashboard;
