import DashboardHeader from "../../components/dashboard/dashboard-header";
import DashboardStatCard from "../../components/dashboard/dashboard-cards/dashboard-statistics-card/index";
import DashboardSummaryCard from "../../components/dashboard/dashboard-cards/dashboard-summary-card/index";
import DashboardNotificationCard from "../../components/dashboard/dashboard-cards/dashboard-notification-card/index";
import S from "./dashboard.styled";
import DashboardBodyTop from "../../components/dashboard/dashboard-body/dashboard-body-top";
import { Box } from "@mui/material";
import DashboardFounder from "../../components/dashboard/dashboard-cards/dashboard-founder-card";

const Dashboard = () => {
  return (
    <>
      <S.DashBoardContainer>
        <DashboardHeader />
        <S.DashBoardBodyWrapper>
          <S.DashBoardStatisticsWrapper>
            <DashboardBodyTop />
          </S.DashBoardStatisticsWrapper>
          <S.DashBoardBottom container>
            {/* <DashboardStatCard /> */}
            <DashboardFounder />
            <DashboardSummaryCard />
            <DashboardNotificationCard />
          </S.DashBoardBottom>
        </S.DashBoardBodyWrapper>
      </S.DashBoardContainer>
    </>
  );
};

export default Dashboard;
