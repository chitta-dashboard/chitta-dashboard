import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";

import IDCardHeader from "../id-card-header";
import IdPhoto from "../../../assets/images/IdImage.png";
import Signature from "../../../assets/images/Signature.png";

import S from "./idCardBody.styled";

type Props = {};

const IdCardBody = forwardRef<HTMLDivElement | undefined>((props: Props, ref) => {
  return (
    <>
      <S.IdCardWrapper ref={ref}>
        <IDCardHeader />
        <S.IdCardBodyWrapper>
          <S.IdImage src={IdPhoto} alt="id-photo" />
          <S.MiddleBox>
            <S.IdDetailsWrapper>
              <S.IdDetailBox>
                <S.IdDetails>பெயர்:</S.IdDetails>
                <S.IdDetails>கைபேசி எண்:</S.IdDetails>
                <S.IdDetails>பிறந்த தேதி:</S.IdDetails>
                <S.IdDetails>தகுதி:</S.IdDetails>{" "}
              </S.IdDetailBox>
              <S.IdDescriptionBox>
                <S.IdDetails>Arockiyaraj</S.IdDetails>
                <S.IdDetails>8940065783</S.IdDetails>
                <S.IdDetails>10/02/1969</S.IdDetails>
                <S.IdDetails>BBA, MBA</S.IdDetails>
              </S.IdDescriptionBox>
            </S.IdDetailsWrapper>
            <S.Signature src={Signature} alt="Signature" />
          </S.MiddleBox>
          <S.QrCode>
            <QRCodeSVG
              value={JSON.stringify({
                id: "1",
                name: "Arockiya",
                phoneNumber: "8940065783",
              })}
              level={"L"}
              size={105}
            />
          </S.QrCode>
        </S.IdCardBodyWrapper>
      </S.IdCardWrapper>
    </>
  );
});

export default IdCardBody;
