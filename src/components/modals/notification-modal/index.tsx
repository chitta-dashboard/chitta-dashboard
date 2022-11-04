import { FC, useState, useRef } from "react";
import Icon from "../../icons";
import { useFetch } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
// import { useAuthContext } from "../../../utils/context/auth";
import S from "./NotificationModal.styled";

interface notificationProps {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLButtonElement | null;
  clearNotifyHandler: () => void;
}

const NotificationModal: FC<notificationProps> = ({ open, handleClose, anchorEl, clearNotifyHandler }) => {
  // const { userNotification } = useAuthContext();
  const {
    result: { data: NotificationData },
    formatChangeSuccess: isSuccess,
  } = useFetch(ENDPOINTS.notification);
  // const { data: NotificationData } = result;
  const [seeMore, setSeeMore] = useState(false);
  const bodyref = useRef<any>();

  const styleHandler = () => {
    bodyref.current.scrollHeight > bodyref.current.clientHeight ? setSeeMore(!seeMore) : setSeeMore(false);
  };

  return (
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
            {user.image && <S.UserImage alt="userImage" src={user.image} />}
            <S.UserText variant="subtitle1">{user.message}</S.UserText>
          </S.BodyBox>
        ))}
      </S.BodyContainer>
      <S.FooterBox>
        <S.FooterText onClick={styleHandler} variant="subtitle1">
          {seeMore ? "See Less" : "See More"}
        </S.FooterText>
      </S.FooterBox>
    </S.ModalContainer>
  );
};

export default NotificationModal;
