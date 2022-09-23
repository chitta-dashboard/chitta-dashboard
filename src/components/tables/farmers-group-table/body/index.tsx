import React, { useState } from "react";
import { TableRow } from "@mui/material";

import BodyWrapper from "../../../custom-tables/body";

import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";
import FarmersGroupModal from "../../../icon-modals/farmers-group-modal";
export interface farmersGroupsType {
  id: number;
  குழுபெயர்: string;
  குழுவிவரங்கள்: string;
}

const farmersGroups: farmersGroupsType[] = [
  {
    id: 1,
    குழுபெயர்: "விவசாயிகள் சங்கம்விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 2,
    குழுபெயர்: "விவசாயிகள் சங்கம்விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 3,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 4,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 5,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 6,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 7,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 8,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 9,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 10,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 11,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 12,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 13,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 14,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
  {
    id: 15,
    குழுபெயர்: "விவசாயிகள் சங்கம்",
    குழுவிவரங்கள்: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  },
];

const Body = () => {
  const [farmerGroupsIcon, setFarmersGroupIcon] = useState(false);
  const farmersGroupsIconModalHandler = () => {
    setFarmersGroupIcon(!farmerGroupsIcon);
  };
  return (
    <>
      <BodyWrapper>
        {farmersGroups.map((farmersGroup) => (
          <TableRow key={farmersGroup.id}>
            <S.WebTableCell>{farmersGroup.id}</S.WebTableCell>
            <S.TabCell>
              <div># {farmersGroup.id}</div>
              <div>
                <CS.Icon onClick={farmersGroupsIconModalHandler}>three-dots</CS.Icon>
              </div>
            </S.TabCell>
            <S.Cell title="குழு பெயர்">{farmersGroup.குழுபெயர்}</S.Cell>
            <S.Cell title="குழு விவரங்கள்">{farmersGroup.குழுவிவரங்கள்}</S.Cell>
            <S.WebTableCell>
              <S.IconBox>
                <CS.Icon>delete</CS.Icon>
                <CS.Icon>edit</CS.Icon>
              </S.IconBox>
            </S.WebTableCell>
          </TableRow>
        ))}
      </BodyWrapper>
      <FarmersGroupModal open={farmerGroupsIcon} handleClose={farmersGroupsIconModalHandler} />
    </>
  );
};

export default Body;
