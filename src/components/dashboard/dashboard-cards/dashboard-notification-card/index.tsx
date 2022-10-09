import { Box } from "@mui/material";
import S from "./dashboardNofication.styled";
import { NotifyIcons } from "../common-styles/commonStyles.styled";

const DashboardNotificationCard = () => {
  return (
    <S.NotificationCardWrapper item sm={12} md={12} lg={3.5} xl={3.5}>
      <S.NotificationHeader>
        Notification
        <Box>
          <i>expand-right</i>
        </Box>
      </S.NotificationHeader>
      <S.NotificationBody>
        <S.NotificationContent>
          <S.NotifyLeft>
            <NotifyIcons>notification</NotifyIcons>
            New MD “Arokiyaraj” has been registered.
          </S.NotifyLeft>
          <S.NotificationDateBox>
            <NotifyIcons>calendar</NotifyIcons>
            30 Aug 2022
          </S.NotificationDateBox>
        </S.NotificationContent>

        {/* 2 */}
        <S.NotificationContent>
          <S.NotifyLeft>
            <NotifyIcons>notification</NotifyIcons>
            New MD Arocikya raj has been registered.
          </S.NotifyLeft>
          <S.NotificationDateBox>
            <NotifyIcons>calendar</NotifyIcons>
            30 Aug 2022
          </S.NotificationDateBox>
        </S.NotificationContent>

        {/* 3 */}
        <S.NotificationContent>
          <S.NotifyLeft>
            <NotifyIcons>notification</NotifyIcons>
            New MD Arocikya raj has been registered.
          </S.NotifyLeft>
          <S.NotificationDateBox>
            <NotifyIcons>calendar</NotifyIcons>
            30 Aug 2022
          </S.NotificationDateBox>
        </S.NotificationContent>

        {/* 4 */}
        <S.NotifyRead>
          <S.NotifyLeft>
            <NotifyIcons>notification</NotifyIcons>
            New MD Arocikya raj has been registered.
          </S.NotifyLeft>
          <S.NotificationDateBox>
            <NotifyIcons>calendar</NotifyIcons>
            30 Aug 2022
          </S.NotificationDateBox>
        </S.NotifyRead>

        {/* 5 */}
        <S.NotifyRead>
          <S.NotifyLeft>
            <NotifyIcons>notification</NotifyIcons>
            New MD Arocikya raj has been registered.
          </S.NotifyLeft>
          <S.NotificationDateBox>
            <NotifyIcons>calendar</NotifyIcons>
            30 Aug 2022
          </S.NotificationDateBox>
        </S.NotifyRead>
      </S.NotificationBody>
    </S.NotificationCardWrapper>
  );
};

export default DashboardNotificationCard;
