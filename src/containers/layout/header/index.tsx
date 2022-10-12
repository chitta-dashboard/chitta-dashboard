import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Theme, useMediaQuery } from "@mui/material";
import { ROUTES } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import NotificationModal from "../../../components/modals/notification-modal";
import S from "./header.styled";
import Logo from "../../../assets/images/logo.svg";
import Icon from "../../../components/icons";

const Header = () => {
  const { userNotification, clearNotification, logout } = useAuthContext();
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const [notification, setnotification] = useState<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  pathname = pathname.split("/")[1];
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const open = Boolean(notification);

  const clearNotifyHandler = () => {
    setnotification(null);
    clearNotification();
  };

  const notificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    Object.values(userNotification).length > 0 ? setnotification(event.currentTarget) : setnotification(null);
  };

  const notificationHandler = () => {
    setnotification(null);
  };

  const popHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const popCloseHandler = () => {
    setAnchorEl(null);
  };

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
            <Icon color={true} iconName={"notification1"} />
          </S.NotificationBadge>
          <S.webIcon onClick={popHandler}>three-dots</S.webIcon>
          <S.TabIcon>account</S.TabIcon>
          <S.TabIcon onClick={logout}>logout</S.TabIcon>
          {isMd ? <i onClick={() => setNavOpen(true)}>menu</i> : null}
        </S.ActionsBox>
      </S.Header>
      <S.Pop
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={popCloseHandler}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <S.Items>Account</S.Items>
        <S.Items onClick={logout}>Logout</S.Items>
      </S.Pop>
      {open && <NotificationModal open={open} anchorEl={notification} handleClose={notificationHandler} clearNotifyHandler={clearNotifyHandler} />}
    </>
  );
};

export default Header;
