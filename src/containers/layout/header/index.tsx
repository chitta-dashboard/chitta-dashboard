import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Theme, useMediaQuery } from "@mui/material";
import { decryptText, ENDPOINTS, ROUTES } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import { useFetch } from "../../../utils/hooks/query";
import NotificationModal from "../../../components/modals/notification-modal";
import PasswordModal from "../../../components/modals/password-modal";
import Logo from "../../../assets/images/logo.svg";
import Icon from "../../../components/icons";
import axios, { AxiosError, AxiosResponse } from "axios";
import Toast from "../../../utils/toast";
import { AdminFormInputs } from "../../../views/admin-panel";
import S from "./header.styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = () => {
  //state values
  const { clearNotification, logout, loader } = useAuthContext();
  const [navOpen, setNavOpen] = useState(false);
  const [notification, setnotification] = useState<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openLoader, setOpenLoader] = useState(false);
  const [importPasswordModal, setImportPasswordModal] = useState(false);
  const [exportPasswordModal, setExportPasswordModal] = useState(false);

  //constants
  const {
    formatChangeSuccess: isSuccessAdmin,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  const { result, formatChangeSuccess: isSuccess } = useFetch(ENDPOINTS.notification);

  const { headerLogo: headerImage, name: titleName } = isSuccessAdmin && Object.values(adminDetails as AdminFormInputs)[0];

  const navigate = useNavigate();
  let { pathname } = useLocation();
  pathname = pathname.split("/")[1];

  const isXl = useMediaQuery((theme: Theme) => theme.breakpoints.down("xl"));
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const open = Boolean(notification);
  const { data: NotificationData } = result;

  //functions
  const clearNotifyHandler = () => {
    setOpenLoader(true);
    clearNotification();
  };

  const notificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    Object.values(NotificationData).length > 0 ? setnotification(event.currentTarget) : setnotification(null);
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

  const slidesToShowFunc = () => {
    switch (isLg || isXl || null) {
      case isLg:
        return 5;
      case isXl:
        return 7;
      default:
        return 8;
    }
  };

  const initialSlideFunc = () => {
    switch (isLg || isXl || null) {
      case pathname.includes("portfolio") && !isXl && !isLg && !isLg:
        return 1;
      case pathname.includes("admin-panel") && isXl && !isLg:
        return 1;
      case pathname.includes("portfolio") && isXl && !isLg:
        return 2;
      case pathname.includes("farmers-details") && isXl && isLg:
        return 3;
      case pathname.includes("board-resolution") && isXl && isLg:
        return 3;
      case pathname.includes("admin-panel") && isXl && isLg:
        return 4;
      case pathname.includes("portfolio") && isXl && isLg:
        return 4;
      default:
        return 0;
    }
  };

  const handleImport = async () => {
    setAnchorEl(null);
    setImportPasswordModal(false);
    loader({ openLoader: true, loaderText: `Importing DB` });
    axios
      .get(`${process.env.REACT_APP_REMOTE_API_KEY}/dbjson/import`)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          Toast({ message: "DB Imported successfully", type: "success" });
          loader({ openLoader: false });
          navigate(0);
        } else loader({ openLoader: false });
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
        loader({ openLoader: false });
      });
  };

  const handleExport = async () => {
    setAnchorEl(null);
    setExportPasswordModal(false);
    loader({ openLoader: true, loaderText: `Exporting DB` });
    axios
      .get(`${process.env.REACT_APP_REMOTE_API_KEY}/dbjson/export`)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          Toast({ message: "DB Exported successfully", type: "success" });
          loader({ openLoader: false });
        } else loader({ openLoader: false });
      })
      .catch((error: AxiosError) => {
        console.log(error);
        loader({ openLoader: false });
      });
  };

  useEffect(() => {
    if (NotificationData && Object.values(NotificationData).length === 0) {
      setOpenLoader(false);
      setnotification(null);
    }
  }, [NotificationData]);

  let settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShowFunc(),
    slidesToScroll: 1,
    initialSlide: initialSlideFunc(),
    centerPadding: "1rem",
  };

  return (
    <>
      <S.Header>
        <S.LogoBox>
          <S.Logo src={headerImage ? decryptText(headerImage) : Logo} alt="Nerkathir Logo" onClick={() => navigate("/dashboard")} />
          <S.LogoText>
            {titleName ? (
              <>
                {titleName} உழவர் <br />
                உற்பத்தியாளர் நிறுவனம்
              </>
            ) : (
              <>நெற்கதிர் உழவர் உற்பத்தியாளர் நிறுவனம்</>
            )}
          </S.LogoText>
        </S.LogoBox>
        <S.NavBar isOpen={navOpen}>
          <>
            {isMd && (
              <>
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
              </>
            )}
          </>
          {!isMd && (
            <S.NavbarSlickContainer>
              <Slider {...settings}>
                {ROUTES.map((route) => (
                  <S.NavLink to={`./${route.route}`} isActive={pathname === `${route.route}`} key={route.route}>
                    <S.NavLinkText isActive={pathname === `${route.route}`}>{route.name}</S.NavLinkText>
                  </S.NavLink>
                ))}
              </Slider>
            </S.NavbarSlickContainer>
          )}
        </S.NavBar>
        <S.ActionsBox>
          <S.NotificationBadge onClick={notificationClick} badgeContent={isSuccess && Object.values(NotificationData).length}>
            <Icon color={true} iconName={"notification1"} />
          </S.NotificationBadge>
          <S.webIcon onClick={popHandler}>three-dots</S.webIcon>
          <S.TabIcon>account</S.TabIcon>
          <S.TabIcon onClick={logout}>logout</S.TabIcon>
          {isMd ? <S.MenuIcon onClick={() => setNavOpen(true)}>menu</S.MenuIcon> : null}
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
        <S.Items
          onClick={() => {
            setImportPasswordModal(true);
          }}
        >
          Import DB
        </S.Items>
        <S.Items
          onClick={() => {
            setExportPasswordModal(true);
          }}
        >
          Export DB
        </S.Items>
        <S.Items onClick={logout}>Logout</S.Items>
      </S.Pop>
      {open && (
        <NotificationModal
          open={open}
          anchorEl={notification}
          handleClose={notificationHandler}
          clearNotifyHandler={clearNotifyHandler}
          openLoader={openLoader}
        />
      )}
      {importPasswordModal && (
        <PasswordModal
          openModal={true}
          handleClose={() => {
            setImportPasswordModal(false);
          }}
          cb={handleImport}
        />
      )}
      {exportPasswordModal && (
        <PasswordModal
          openModal={true}
          handleClose={() => {
            setExportPasswordModal(false);
          }}
          cb={handleExport}
        />
      )}
    </>
  );
};

export default Header;
