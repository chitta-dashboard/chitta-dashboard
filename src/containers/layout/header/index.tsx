import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Theme, useMediaQuery } from "@mui/material";
import { ROUTES } from "../../../utils/constants";
import Logo from "../../../assets/images/logo.svg";
import { useAuthContext } from "../../../utils/context/authContext";
import NotificationModal from "../../../components/modals/notification-modal";
import NotificationsIcon from "@mui/icons-material/Notifications";
import S from "./header.styled";

const Header = () => {
  const { userNotification, clearNotification } = useAuthContext();
  let { pathname } = useLocation();
  pathname = pathname.split("/")[1];

  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [navOpen, setNavOpen] = useState(false);
  const [notification, setnotification] = useState<HTMLButtonElement | null>(null);
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const clearNotifyHandler = () => {
    setnotification(null);
    clearNotification();
  };

  const notificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setnotification(event.currentTarget);
  };

  const notificationHandler = () => {
    setnotification(null);
  };

  const open = userNotification.length > 0 ? Boolean(notification) : false;
  const shouldOpen = Boolean(notification);

  return (
    <>
      <S.Header>
        <S.LogoBox>
          <S.Logo src={Logo} alt="Nerkathir Logo" onClick={() => navigate("/dashboard")} />
          <S.LogoText>
            நெற்கதிர் உழவர் <br /> உற்பத்தியாளர் நிறுவனம்
          </S.LogoText>
        </S.LogoBox>
        <S.NavBar isOpen={navOpen}>
          {isMd ? (
            <S.NavBarMenu>
              Menu <i onClick={() => setNavOpen(false)}>close</i>
            </S.NavBarMenu>
          ) : null}
          {ROUTES.map((route) => (
            <S.NavLink to={`./${route.route}`} isActive={pathname === `${route.route}`} key={route.route}>
              <S.NavLinkText isActive={pathname === `${route.route}`}>{route.name}</S.NavLinkText>
            </S.NavLink>
          ))}
        </S.NavBar>
        <S.ActionsBox>
          <S.NotificationBadge onClick={notificationClick} badgeContent={userNotification.length}>
            <NotificationsIcon />
          </S.NotificationBadge>
          <i>account</i>
          <i onClick={logout}>logout</i>
          {isMd ? <i onClick={() => setNavOpen(true)}>menu</i> : null}
        </S.ActionsBox>
      </S.Header>
      {shouldOpen && (
        <NotificationModal open={open} anchorEl={notification} handleClose={notificationHandler} clearNotifyHandler={clearNotifyHandler} />
      )}
    </>
  );
};

export default Header;
