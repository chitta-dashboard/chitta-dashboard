import React, { useState, useRef, useEffect } from "react";
import { TableRow, Avatar } from "@mui/material";
import { fileValidation } from "../../../../utils/const/const";
import BodyWrapper from "../../../custom-tables/body";
import userPic from "../../../../assets/images/user.png";

import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";
import MdDetailModal from "../../../icon-modals/md-detail-modal";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import { useMdDetailsContext } from "../../../../utils/context/md-details";
import DeleteModal from "../../../modals/delete-modal";

export interface Users {
  id: number;
  name: string;
  mobileNo: number;
  degree: string;
  profile?: string;
  dob?: string;
  signature?: string;
}

type croppedImageType = { image: string; id: number };

const Body = () => {
  const { mdList, editTableIcon } = useMdDetailsContext();

  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<number>(-1);
  const [isHovering, setIsHovering] = useState<number>(0);
  const [MdDetailsIcon, setMdDetailsIcon] = useState(false);

  const hiddenFileInput: any = useRef<HTMLInputElement>();

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

  const getURL = (id: number) => {
    let result = mdList.filter((item) => {
      return item.id === id ? item.profile : null;
    });
    let data = result.length > 0 ? result[0]["profile"] : undefined;
    return data;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let isValid = e.target && fileValidation(e.target.files[0].name);
    e.target.files && isValid && setImage(window.URL.createObjectURL(e.target.files[0]));
  };

  const handleIconClick = (id: number) => {
    hiddenFileInput && hiddenFileInput.current.click();
    setUserId(id);
  };

  const handleMouseOver = (id: number) => {
    setIsHovering(id);
  };

  const handleMouseOut = (id: number) => {
    setIsHovering(id);
  };

  const handleCroppedImage = (image: string) => {
    let result = mdList.filter((item: Users) => {
      return item.id === userId;
    });
    result[0]["profile"] = image;
    editTableIcon({ ...result[0] });
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
                  <CS.Icon onClick={() => iconModalHandler(user.id)}>three-dots</CS.Icon>
                </div>
              </S.TabCell>
              <S.Cell title="பெயர்">
                <S.NameStack>
                  <S.AvatarBox>
                    <S.AvatarImg alt="User-img" src={getURL(user.id) ? getURL(user.id) : userPic} />
                    <S.EditBox onClick={() => handleIconClick(user.id)}>
                      <S.EditIcon>edit</S.EditIcon>
                      <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} />
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
      ) : (
        <S.EmptyMsg>
          <tr>
            <td> No Data</td>
          </tr>
        </S.EmptyMsg>
      )}
      <MdDetailModal open={iconModal} handleClose={iconModalHandler} deleteId={deleteId} />
      <DeleteModal openModal={deleteModal} handleClose={() => {setDeleteModal(false)}} handleDelete={() => {}}/>
      {image && (
        <tbody>
          <tr>
            <td>
              <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default Body;
