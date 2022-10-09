import { Box } from "@mui/material";
import { S } from "./dashboardStatCard.styled";
import { CardHeader } from "../common-styles/commonStyles.styled";

const DashboardStatCard = () => {
  return (
    <S.StatCardWrapper item sm={12} md={3} lg={2.5} xl={2.5}>
      <CardHeader>
        Statistics
        <Box>
          <i>expand-right</i>
        </Box>
      </CardHeader>
      <S.StatBodyContainer container>
        <S.StatBody item sm={4} md={12} lg={12} xl={12}>
          <S.StatBodyFont>Group Counts</S.StatBodyFont>
          <S.StatBodyNumberFont>169</S.StatBodyNumberFont>
        </S.StatBody>
        <S.StatBody item sm={4} md={12} lg={12} xl={12}>
          <S.StatBodyFont>Farmer Counts</S.StatBodyFont>
          <S.StatBodyNumberFont>326</S.StatBodyNumberFont>
        </S.StatBody>
        <S.StatBody item sm={4} md={12} lg={12} xl={12}>
          <S.StatBodyFont>Cultivation</S.StatBodyFont>
          <S.StatBodyNumberFont>
            77 <S.Span> Quintal </S.Span>{" "}
          </S.StatBodyNumberFont>
        </S.StatBody>
      </S.StatBodyContainer>
    </S.StatCardWrapper>
  );
};

export default DashboardStatCard;
