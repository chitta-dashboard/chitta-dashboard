import { FC, useState } from "react";
import S from "./NotificationModal.styled";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useAuthContext } from "../../../utils/context/authContext";

//
interface notificationProps {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLButtonElement | null;
  clearNotifyHandler: () => void;
}

const NotificationModal: FC<notificationProps> = ({ open, handleClose, anchorEl, clearNotifyHandler }) => {
  const { userNotification } = useAuthContext();
  const [seeMore, setSeeMore] = useState(false);

  const styleHandler = () => {
    setSeeMore(!seeMore);
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
            <S.IconBox>settings</S.IconBox>
            <DoneAllIcon style={{ cursor: "pointer" }} onClick={clearNotifyHandler} />
          </S.HeadingIcons>
        </S.HeadingBox>
        <S.BodyContainer isheight={seeMore ? 1 : 0}>
          {userNotification.map((user) => (
            <S.BodyBox key={user.id}>
              <S.UserImage alt="userImage" src={user.image} />
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
    </>
  );
};

export default NotificationModal;
