import { FC, useState, useRef } from "react";
import { useFetch } from "../../../utils/hooks/query";
import { decryptText, ENDPOINTS } from "../../../utils/constants";
import { BufferLoader } from "../../../utils/loaders/api-loader";
import Icon from "../../icons";
import S from "./NotificationModal.styled";

interface notificationProps {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLButtonElement | null;
  clearNotifyHandler: () => void;
  openLoader: boolean;
}

const NotificationModal: FC<notificationProps> = ({ open, handleClose, anchorEl, clearNotifyHandler, openLoader }) => {
  const {
    result: { data: NotificationData },
    formatChangeSuccess: isSuccess,
  } = useFetch(ENDPOINTS.notification);
  const [seeMore, setSeeMore] = useState(false);
  const bodyref = useRef<any>();
  const styleHandler = () => {
    bodyref.current.scrollHeight > bodyref.current.clientHeight ? setSeeMore(!seeMore) : setSeeMore(false);
  };

  return (
    <>
      <S.ModalContainer
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <S.HeadingBox>
          <S.HeadingText variant="h6">Notification</S.HeadingText>
          <S.HeadingIcons>
            <Icon iconName={"settings"} />
            <Icon iconName={"mark-all-as-read"} clickHandler={clearNotifyHandler} />
          </S.HeadingIcons>
        </S.HeadingBox>
        <S.BodyContainer isheight={seeMore ? 1 : 0} ref={bodyref}>
          {Object.values(isSuccess && (NotificationData as notificationProps)).map((user, i) => (
            <S.BodyBox key={user.id + i}>
              <S.UserImage alt="userImage" src={user.image ? decryptText(user.image) : ""} />
              <S.UserText variant="subtitle1">{user.message}</S.UserText>
            </S.BodyBox>
          ))}
        </S.BodyContainer>
        {isSuccess && Object.values(NotificationData).length > 3 && (
          <S.FooterBox>
            <S.FooterText onClick={styleHandler} variant="subtitle1">
              {seeMore ? "See Less" : "See More"}
            </S.FooterText>{" "}
          </S.FooterBox>
        )}
        <S.LoaderContainer open={openLoader}>
          <BufferLoader loaderText="Clearing Notifications" />
        </S.LoaderContainer>
      </S.ModalContainer>
    </>
  );
};

export default NotificationModal;
