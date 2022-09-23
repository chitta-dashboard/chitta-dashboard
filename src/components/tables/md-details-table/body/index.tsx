import React, { useState } from "react";
import { TableRow, Avatar } from "@mui/material";

import BodyWrapper from "../../../custom-tables/body";
import userPic from "../../../../assets/images/user.png";

import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";
import MdDetailModal from "../../../icon-modals/md-detail-modal";
import { useMdDetailsContext } from "../../../../utils/context/md-details";

export interface Users {
  id: number;
  image: string;
  name: string;
  mobileNo: number;
  degree: string;
}

const Body = () => {
  const { mdList } = useMdDetailsContext();
  const [MdDetailsIcon, setMdDetailsIcon] = useState(false);

  const mdDetailsIconModalHandler = () => {
    setMdDetailsIcon(!MdDetailsIcon);
  };

  const [isHovering, setIsHovering] = useState<number>(0);

  const handleMouseOver = (id: number) => {
    setIsHovering(id);
  };

  const handleMouseOut = (id: number) => {
    setIsHovering(id);
  };

  return (
    <>
      {mdList.length > 0 ? (
        <BodyWrapper>
          {mdList.map((user) => (
            <TableRow key={user.id}>
              <S.WebTableCell>{user.id}</S.WebTableCell>
              <S.TabCell>
                <div># {user.id}</div>
                <div>
                  <CS.Icon onClick={mdDetailsIconModalHandler}>three-dots</CS.Icon>
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
      ) : (
        <S.EmptyMsg>No Data</S.EmptyMsg>
      )}

      <MdDetailModal open={MdDetailsIcon} handleClose={mdDetailsIconModalHandler} />
    </>
  );
};

export default Body;
