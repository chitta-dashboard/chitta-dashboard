import React, { useState } from "react";
import { TableRow } from "@mui/material";

import BodyWrapper from "../../../custom-tables/body";
import MdDetailModal from "../../../icon-modals/md-detail-modal";
import DeleteModal from "../../../modals/delete-modal";

import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";
import { useMdDetailsContext } from "../../../../utils/context/md-details";

const Body = () => {
  const { mdList } = useMdDetailsContext();

  // const [users, setUsers] = useState(mdList);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [iconModal, setIconModal] = useState(false);

  //Md details Delete Modal
  const deleteModalHandler = (id: number) => {
    setDeleteModal(!deleteModal);
    setDeleteId(id);
  };

  //Tab Icon Open & Close Handler
  const iconModalHandler = (id: number) => {
    setIconModal(!iconModal);
    setDeleteId(id);
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
      <BodyWrapper>
        {mdList.map((user) => (
          <TableRow key={user.id}>
            <S.WebTableCell>{user.id}</S.WebTableCell>
            <S.TabCell>
              <div># {user.id}</div>
              <div>
                <CS.Icon onClick={() => iconModalHandler(user.id)}>three-dots</CS.Icon>
              </div>
            </S.TabCell>
            <S.Cell title="பெயர்">
              <S.NameStack>
                <S.AvatarBox>
                  <S.AvatarImg alt="User-img" src={user.profile} />
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
                <CS.Icon onClick={() => deleteModalHandler(user.id)}>delete</CS.Icon>
                <CS.Icon>id-card</CS.Icon>
                <CS.Icon>edit</CS.Icon>
              </S.IconBox>
            </S.WebTableCell>
          </TableRow>
        ))}
      </BodyWrapper>
      <MdDetailModal open={iconModal} handleClose={iconModalHandler} deleteId={deleteId} />
      <DeleteModal openModal={deleteModal} handleClose={deleteModalHandler} deleteId={deleteId} />
    </>
  );
};

export default Body;
