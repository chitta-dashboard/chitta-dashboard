import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import S from "./idCardBody.styled";
import Signature from "../../../assets/images/Signature.png";
import placeHolderImg from "../../../assets/images/profile-placeholder.jpg";
import { decryptText } from "../../../utils/constants";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { Founders } from "../../../utils/context/founders";
import { IMdDetails } from "../../../utils/context/mdDetails";
import IDCardHeader from "../id-card-header";

interface Props {
  data?: farmerDetail | IMdDetails | Founders;
}

type Ref = HTMLDivElement | undefined;

const IdCardBody = forwardRef<Ref, Props>((props, ref) => {
  const { data } = props;
  return (
    <S.IdCardWrapper ref={ref}>
      <IDCardHeader />
      <S.IdCardBodyWrapper>
        <S.IdImage src={data?.profile ? decryptText(data?.profile) : placeHolderImg} alt="id-photo" />
        <S.MiddleBox>
          <S.IdDetailsWrapper>
            <S.DescriptionBox>
              <S.UserBox>
                <S.IdDetails>பெயர்:</S.IdDetails>
              </S.UserBox>
              <S.UserDetailBox>
                <S.IdDetails>{data?.name}</S.IdDetails>
              </S.UserDetailBox>
            </S.DescriptionBox>
            <S.DescriptionBox>
              <S.UserBox>
                <S.IdDetails>கைபேசி எண்:</S.IdDetails>
              </S.UserBox>
              <S.UserDetailBox>
                <S.IdDetails>{data?.phoneNumber}</S.IdDetails>
              </S.UserDetailBox>
            </S.DescriptionBox>
            <S.DescriptionBox>
              <S.UserBox>
                <S.IdDetails>பிறந்த தேதி:</S.IdDetails>
              </S.UserBox>
              <S.UserDetailBox>
                <S.IdDetails>{data?.dob}</S.IdDetails>
              </S.UserDetailBox>
            </S.DescriptionBox>
            <S.DescriptionBox>
              <S.UserBox>
                <S.IdDetails>தகுதி:</S.IdDetails>
              </S.UserBox>
              <S.UserDetailBox>
                <S.IdDetails>{data?.qualification}</S.IdDetails>
              </S.UserDetailBox>
            </S.DescriptionBox>
          </S.IdDetailsWrapper>
          <S.Signature src={Signature} alt="Signature" />
        </S.MiddleBox>
        <S.QrCode>
          <QRCodeSVG
            value={JSON.stringify({
              name: data?.name,
              phoneNumber: data?.phoneNumber,
              dob: data?.dob,
              qualification: data?.qualification,
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
