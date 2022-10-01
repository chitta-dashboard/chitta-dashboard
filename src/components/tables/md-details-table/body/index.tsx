import React, { useState, useRef, useEffect } from "react";
import { TableRow } from "@mui/material";

import BodyWrapper from "../../../custom-tables/body";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import userPic from "../../../../assets/images/user.png";
import MdDetailModal from "../../../icon-modals/md-detail-modal";
import DeleteModal from "../../../modals/delete-modal";
import AddMdDetailsModal from "../../../modals/md-details-modal";
import { useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { IAddMDDetailsFormInput } from "../../../modals/type/formInputs";
import { fileValidation, searchWord, sortObj } from "../../../../utils/constants";
import { mdDetail } from "../../../../utils/context/mdDetails";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";

const Body = () => {
  const { mdList: listData, editTableIcon, editMdDetail, deleteMdDetail, searchFilter, sortFilter, page, rowsPerPage } = useMdDetailsContext();
  const [mdListSearch, setMdListSearch] = useState(listData);
  const [mdListSort, setMdListSort] = useState(listData);
  const [mdListPaginate, setMdListPaginate] = useState(listData);
  const [mdList, setMdList] = useState(listData);

  useEffect(() => {
    setMdListSearch(listData.filter((md) => searchWord(md.name, searchFilter)));
  }, [listData, searchFilter]);

  useEffect(() => {
    setMdListSort(sortObj<mdDetail>(mdListSearch, sortFilter, "name"));
  }, [mdListSearch, sortFilter]);

  useEffect(() => {
    setMdListPaginate(mdListSort.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage));
  }, [mdListSort, page, rowsPerPage]);

  useEffect(() => {
    setMdList(mdListPaginate);
  }, [mdListPaginate]);

  const [image, setImage] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const hiddenFileInput: any = useRef<HTMLInputElement>();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  // Delete ModalHandler
  const deleteModalHandler = (id: string) => {
    setDeleteModal(!deleteModal);
    setDeleteId(id);
  };
  // Tab IconModal Open & Close Handler
  const iconModalHandler = (id: string) => {
    setIconModal(!iconModal);
    setDeleteId(id);
    setEditId(id);
  };
  //Edit MdDetail Handler
  const editMdDetailHandler = (id: string) => {
    setEditMode(!editMode);
    setEditId(id);
  };
  //Update MdDetail Handler
  const updateMdDetail = (data: IAddMDDetailsFormInput & { id: string }) => {
    setIconModal(false);
    editMdDetail(data);
  };

  const getURL = (id: string) => {
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

  const handleIconClick = (id: string) => {
    hiddenFileInput && hiddenFileInput.current.click();
    setUserId(id);
  };

  const handleCroppedImage = (image: string) => {
    let result = mdList.filter((item) => {
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
              <S.TabCell>
                <CS.Icon onClick={() => iconModalHandler(user.id)}>three-dots</CS.Icon>
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
              <S.Cell title="கைபேசி எண்">{user.phoneNumber}</S.Cell>
              <S.Cell title="தகுதி">{user.qualification}</S.Cell>
              <S.WebTableCell>
                <S.IconBox>
                  <CS.Icon onClick={() => deleteModalHandler(user.id)}>delete</CS.Icon>
                  <CS.Icon>id-card</CS.Icon>
                  <CS.Icon onClick={() => editMdDetailHandler(user.id)}>edit</CS.Icon>
                </S.IconBox>
              </S.WebTableCell>
            </TableRow>
          ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td>No Md Details Data</td>
          </tr>
        </S.EmptyMsg>
      )}
      <MdDetailModal
        open={iconModal}
        handleClose={() => setIconModal(false)}
        handleDelete={() => {
          setDeleteModal(true);
        }}
        handleEdit={() => {
          setEditMode(true);
        }}
      />
      <DeleteModal
        openModal={deleteModal}
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => {
          deleteMdDetail(deleteId);
          setDeleteModal(false);
          setIconModal(false);
        }}
      />
      {image && (
        <tbody>
          <tr>
            <td>
              <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />
            </td>
          </tr>
        </tbody>
      )}
      <AddMdDetailsModal openModal={editMode} handleClose={() => setEditMode(false)} cb={updateMdDetail} editMode={editMode} id={editId} />
    </>
  );
};

export default Body;
