import React, { useState, useRef, useEffect } from "react";
import { TableRow } from "@mui/material";
import { mdDetail, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { fileValidation, searchWord, sortObj } from "../../../../utils/constants";
import BodyWrapper from "../../../custom-tables/body";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import userPic from "../../../../assets/images/user.png";
import MdDetailModal from "../../../icon-modals/md-detail-modal";
import DeleteModal from "../../../modals/delete-modal";
import AddMdDetailsModal from "../../../modals/md-details-modal";
import ConfirmationModal from "../../../modals/confirmation-modal";
import { IAddMDDetailsFormInput } from "../../../modals/type/formInputs";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";

const Body = () => {
  const { mdList: listData, editTableIcon, editMdDetail, deleteMdDetail, searchFilter, sortFilter } = useMdDetailsContext();
  const [mdListSearch, setMdListSearch] = useState(listData);
  const [mdListSort, setMdListSort] = useState(listData);
  const [mdList, setMdList] = useState(listData);
  const [image, setImage] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [isCheck, setIsCheck] = useState<boolean>(false);

  useEffect(() => {
    setMdListSearch(listData.filter((md) => searchWord(md.name, searchFilter)));
  }, [listData, searchFilter]);

  useEffect(() => {
    setMdListSort(sortObj<mdDetail>(mdListSearch, sortFilter, "name"));
  }, [mdListSearch, sortFilter]);

  useEffect(() => {
    setMdList(mdListSort);
  }, [mdListSort]);

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

  // Delete ModalHandler
  const deleteModalHandler = (id: string) => {
    setDeleteModal(!deleteModal);
    setDeleteId(id);
  };

  // Switch Handler
  const checkHandler = (id: string) => {
    setIsCheck(!isCheck);
    setDeleteId(id);
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
    return false;
  };

  // this function is to clear the value of input field, so we can upload same file as many time has we want.
  const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };

  const handleIconClick = (id: string) => {
    hiddenFileInput && hiddenFileInput.current.click();
    setUserId(id);
  };

  const handleCroppedImage = (image: string) => {
    if (!image) return;
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
                      <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
                    </S.EditBox>
                  </S.AvatarBox>
                  {user.name}
                </S.NameStack>
              </S.Cell>
              <S.Cell title="பிறந்த தேதி">{user.dob}</S.Cell>
              <S.Cell title="கைபேசி எண்">{user.phoneNumber}</S.Cell>
              <S.Cell title="தகுதி">{user.qualification}</S.Cell>
              <S.WebTableCell>
                <S.IconBox>
                  <CS.Icon onClick={() => deleteModalHandler(user.id)}>delete</CS.Icon>
                  <CS.Icon>id-card</CS.Icon>
                  <CS.Icon onClick={() => editMdDetailHandler(user.id)}>edit</CS.Icon>
                  <S.Toggle checked={!!user.id} onChange={() => checkHandler(user.id)} />
                </S.IconBox>
              </S.WebTableCell>
            </TableRow>
          ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td>No Md Details..</td>
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
        check={deleteId}
        handleCheck={() => {
          setIsCheck(true);
        }}
      />
      <ConfirmationModal
        openModal={isCheck}
        handleClose={() => setIsCheck(false)}
        yesAction={() => {
          deleteMdDetail(deleteId);
          setIsCheck(false);
          setIconModal(false);
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
