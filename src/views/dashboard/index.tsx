import React from "react";

import DashboardHeader from "../../components/dashboard/dashboard-header";
import DashboardStatCard from "../../components/dashboard/dashboard-cards/dashboard-statistics-card/index";
import DashboardSummaryCard from "../../components/dashboard/dashboard-cards/dashboard-summary-card/index";
import DashboardNotificationCard from "../../components/dashboard/dashboard-cards/dashboard-notification-card/index";

import S from "./dashboard.styled";
import IdCardBody from "../../components/id-card/id-card-body";

const Dashboard = () => {
  return (
    // <S.DashBoaderContainer>
    //   <DashboardHeader />
    //   <S.DashBoaderBodyWrapper container>
    //     <DashboardStatCard />
    //     <DashboardSummaryCard />
    //     <DashboardNotificationCard />
    //   </S.DashBoaderBodyWrapper>
    // </S.DashBoaderContainer>
    <IdCardBody />
  );
};

export default Dashboard;
