import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import IDCardHeader from "../id-card-header";
import Signature from "../../../assets/images/Signature.png";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { mdDetail } from "../../../utils/context/mdDetails";
import S from "./idCardBody.styled";

interface Props {
  data?: farmerDetail | mdDetail;
}

type Ref = HTMLDivElement | undefined;

const IdCardBody = forwardRef<Ref, Props>((props, ref) => {
  const { data } = props;
  return (
    <S.IdCardWrapper ref={ref}>
      <IDCardHeader />
      <S.IdCardBodyWrapper>
        <S.IdImage src={data?.profile} alt="id-photo" />
        <S.MiddleBox>
          <S.IdDetailsWrapper>
            <S.DescriptionBox>
              <S.UserBox>
                <S.IdDetails>பெயர்:</S.IdDetails>
              </S.UserBox>
              <S.UserBox>
                <S.IdDetails>{data?.name}</S.IdDetails>
              </S.UserBox>
            </S.DescriptionBox>
            <S.DescriptionBox>
              <S.UserBox>
                <S.IdDetails>கைபேசி எண்:</S.IdDetails>
              </S.UserBox>
              <S.UserBox>
                <S.IdDetails>{data?.phoneNumber}</S.IdDetails>
              </S.UserBox>
            </S.DescriptionBox>
            <S.DescriptionBox>
              <S.UserBox>
                <S.IdDetails>பிறந்த தேதி:</S.IdDetails>
              </S.UserBox>
              <S.UserBox>
                <S.IdDetails>{data?.dob}</S.IdDetails>
              </S.UserBox>
            </S.DescriptionBox>
            <S.DescriptionBox>
              <S.UserBox>
                <S.IdDetails>தகுதி:</S.IdDetails>
              </S.UserBox>
              <S.UserBox>
                <S.IdDetails>{data?.qualification}</S.IdDetails>
              </S.UserBox>
            </S.DescriptionBox>
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
  );
});

export default IdCardBody;
