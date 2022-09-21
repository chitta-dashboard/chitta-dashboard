import React from "react";
import { Box } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

import IDCardHeader from "../id-card-header";
import IdPhoto from "../../../assets/images/IdImage.png";
import Signature from "../../../assets/images/Signature.png";

import S from "./idCardBody.styled";

type Props = {};

const IdCardBody = (props: Props) => {
  return (
    <>
      <S.IdCardWrapper>
        <IDCardHeader />
        <S.IdCardBodyWrapper>
          <S.IdImage src={IdPhoto} alt="id-photo" />
          <S.MiddleBox>
            <S.IdDetailsWrapper>
              <Box>
                <S.IdDetails>பெயர்:</S.IdDetails>
                <S.IdDetails>கைபேசி எண்:</S.IdDetails>
                <S.IdDetails>பிறந்த தேதி:</S.IdDetails>
                <S.IdDetails>தகுதி:</S.IdDetails>{" "}
              </Box>
              <Box>
                <S.IdDetails>Arockiya</S.IdDetails>
                <S.IdDetails>8940065783</S.IdDetails>
                <S.IdDetails>10/02/1969</S.IdDetails>
                <S.IdDetails>BBA, MBA</S.IdDetails>
              </Box>
            </S.IdDetailsWrapper>
            <S.Signature src={Signature} alt="Signature" />
          </S.MiddleBox>
          <S.BarCode>
            <QRCodeSVG
              value={JSON.stringify({
                id: "1",
                name: "Arockiya",
                phoneNumber: "8940065783",
              })}
              level={"L"}
              size={110}
            />
          </S.BarCode>
        </S.IdCardBodyWrapper>
      </S.IdCardWrapper>
    </>
  );
};

export default IdCardBody;
