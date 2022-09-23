import React, { MouseEvent, useState } from "react";
import { TableCell, TableRow, Avatar } from "@mui/material";

import BodyWrapper from "../../../custom-tables/body";
import userPic from "../../../../assets/images/user.png";

import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";

export interface Users {
  id: number;
  image: string;
  name: string;
  mobileNo: number;
  degree: string;
}

const users: Users[] = [
  {
    id: 1,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 2,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 3,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 4,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 5,
    image: "image",
    name: "Arokiya Arokiya Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 6,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 7,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 8,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 9,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 10,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 11,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 12,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 13,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 14,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 15,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
];

const Body = () => {
  const [isHovering, setIsHovering] = useState<number>(0);

  const handleMouseOver = (id: number) => {
    setIsHovering(id);
  };

  const handleMouseOut = (id: number) => {
    setIsHovering(id);
  };

  return (
    <BodyWrapper>
      {users.map((user) => (
        <TableRow key={user.id}>
          <S.WebTableCell>{user.id}</S.WebTableCell>
          <S.TabCell>
            <div># {user.id}</div>
            <div>
              <CS.Icon>three-dots</CS.Icon>
            </div>
          </S.TabCell>
          <S.Cell title="பெயர்">
            <S.NameStack>
              <S.AvatarBox>
                <S.AvatarImg alt="User-img" src={userPic} />
                <S.EditBox onClick={() => {}}>
                  <S.EditIcon>edit</S.EditIcon>
                </S.EditBox>
              </S.AvatarBox>
              {user.name}
            </S.NameStack>
          </S.Cell>
          <S.Cell title="கைபேசி எண்">{user.mobileNo}</S.Cell>
          <S.Cell title="தகுதி">{user.degree}</S.Cell>
          <S.WebTableCell>
            <S.IconBox>
              <CS.Icon>delete</CS.Icon>
              <CS.Icon>id-card</CS.Icon>
              <CS.Icon>edit</CS.Icon>
            </S.IconBox>
          </S.WebTableCell>
        </TableRow>
      ))}
    </BodyWrapper>
  );
};

export default Body;
