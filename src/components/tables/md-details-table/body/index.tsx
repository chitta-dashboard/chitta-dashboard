import React from "react";
import { TableCell, TableRow, Avatar } from "@mui/material";

import BodyWrapper from "../../../custom-tables/body";
import userPic from "../../../../assets/images/user.png";

import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";

interface Users {
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
  return (
    <BodyWrapper>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.id}</TableCell>
          <TableCell>
            <S.NameStack>
              <Avatar alt="User-img" src={userPic} />
              {user.name}
            </S.NameStack>
          </TableCell>
          <TableCell>{user.mobileNo}</TableCell>
          <TableCell>{user.degree}</TableCell>
          <TableCell>
            <S.IconBox>
              <CS.Icon>delete</CS.Icon>
              <CS.Icon>id-card</CS.Icon>
              <CS.Icon>edit</CS.Icon>
            </S.IconBox>
          </TableCell>
        </TableRow>
      ))}
    </BodyWrapper>
  );
};

export default Body;
