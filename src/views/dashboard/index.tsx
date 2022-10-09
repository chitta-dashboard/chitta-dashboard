import DashboardHeader from "../../components/dashboard/dashboard-header";
import DashboardSummaryCard from "../../components/dashboard/dashboard-cards/dashboard-summary-card/index";
import DashboardBodyTop from "../../components/dashboard/dashboard-body/dashboard-body-top";
import DashboardFounder from "../../components/dashboard/dashboard-cards/dashboard-founder-card";
import S from "./dashboard.styled";

const Dashboard = () => {
  return (
    <S.DashBoardContainer>
      <DashboardHeader />
      <S.DashBoardBodyWrapper>
        <S.DashBoardStatisticsWrapper>
          <DashboardBodyTop />
        </S.DashBoardStatisticsWrapper>
        <S.DashBoardBottom container>
          {/* <DashboardStatCard /> */}
          <DashboardSummaryCard />
          <DashboardFounder />
          {/* <DashboardNotificationCard /> */}
        </S.DashBoardBottom>
      </S.DashBoardBodyWrapper>
    </S.DashBoardContainer>
  );
};

export default Dashboard;
