import React from "react";

import { Box } from "@mui/material";
import S from "./dashboardNofication.styled";
import { NotifyIcons } from "../common-styles/commonStyles.styled";

type Props = {};

const DashboardNotificationCard = (props: Props) => {
  return (
    <>
      <S.NotificationCardWrapper item sm={10.5} md={3.5} lg={3.5} xl={3.5}>
        <S.NotificationHeader>
          Notification
          <Box>
            <i>expand-right</i>
          </Box>
        </S.NotificationHeader>
        <S.NotificationBody>
          <S.NotificationContent>
            <NotifyIcons>notification</NotifyIcons>
            New MD Arocikya raj has been registered.
            <S.NotificationDateBox>
              <NotifyIcons>calendar</NotifyIcons>
              30 Aug 2022
            </S.NotificationDateBox>
          </S.NotificationContent>

          {/* 2 */}
          <S.NotificationContent>
            <NotifyIcons>notification</NotifyIcons>
            New MD Arocikya raj has been registered.
            <S.NotificationDateBox>
              <NotifyIcons>calendar</NotifyIcons>
              30 Aug 2022
            </S.NotificationDateBox>
          </S.NotificationContent>

          {/* 3 */}
          <S.NotificationContent>
            <NotifyIcons>notification</NotifyIcons>
            New MD Arocikya raj has been registered.
            <S.NotificationDateBox>
              <NotifyIcons>calendar</NotifyIcons>
              30 Aug 2022
            </S.NotificationDateBox>
          </S.NotificationContent>

          {/* 4 */}
          <S.NotifyRead>
            <NotifyIcons>notification</NotifyIcons>
            New MD Arocikya raj has been registered.
            <S.NotificationDateBox>
              <NotifyIcons>calendar</NotifyIcons>
              30 Aug 2022
            </S.NotificationDateBox>
          </S.NotifyRead>

          {/* 5 */}
          <S.NotifyRead>
            <NotifyIcons>notification</NotifyIcons>
            New MD Arocikya raj has been registered.
            <S.NotificationDateBox>
              <NotifyIcons>calendar</NotifyIcons>
              30 Aug 2022
            </S.NotificationDateBox>
          </S.NotifyRead>
        </S.NotificationBody>
      </S.NotificationCardWrapper>
    </>
  );
};

export default DashboardNotificationCard;
