import React, { useState, useRef, useEffect } from "react";
import { TableRow } from "@mui/material";
import { Founders, useFounderContext } from "../../../../utils/context/founders";
import { fileValidation, searchWord, sortObj } from "../../../../utils/constants";
import { IAddCEODetailsFormInput } from "../../../modals/type/formInputs";
import BodyWrapper from "../../../custom-tables/body";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import userPic from "../../../../assets/images/user.png";
import FoundersModal from "../../../modals/founders-modal";
import DeleteModal from "../../../modals/delete-modal";
import IdCardModal from "../../../modals/id-download-modal";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";

const Body = () => {
  const { foundersById: listData, editFounder, deleteFounder, searchFilter, sortFilter } = useFounderContext();
  const [founderSearch, setFounderSearch] = useState<Founders[]>(Object.values(listData));
  const [founderSort, setFounderSort] = useState<Founders[]>(Object.values(listData));
  const [founder, setFounder] = useState<Founders[]>(Object.values(listData));
  const [image, setImage] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [idCardData, setIdCardData] = useState<Founders>();

  useEffect(() => {
    setFounderSearch(Object.values(listData).filter((list) => searchWord(list.name, searchFilter)));
  }, [listData, searchFilter]);

  useEffect(() => {
    setFounderSort(sortObj<Founders>(founderSearch, sortFilter, "name"));
  }, [founderSearch, sortFilter]);

  useEffect(() => {
    setFounder(founderSort);
  }, [founderSort]);

  // Tab IconModal Open & Close Handler
  const iconModalHandler = (id: string) => {
    setIconModal(!iconModal);
    setDeleteId(id);
    setEditId(id);
  };

  //Edit Founders Handler
  const editFoundersHandler = (id: string) => {
    setEditMode(!editMode);
    setEditId(id);
  };

  //Update Founders Handler
  const updateFounders = (data: IAddCEODetailsFormInput & { id: string }) => {
    setIconModal(false);
    editFounder(data);
  };

  // Delete ModalHandler
  const deleteModalHandler = (id: string) => {
    setDeleteModal(!deleteModal);
    setDeleteId(id);
  };

  const getURL = (id: string) => {
    let result = Object.values(founder).filter((item) => {
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
    let result = Object.values(founder).filter((item) => {
      return item.id === userId;
    });
    result[0]["profile"] = image;
    editFounder({ ...result[0] });
  };

  const handleClose = (user?: Founders) => {
    setOpen(!open);
    setIdCardData(user);
  };

  return (
    <>
      {founder.length > 0 ? (
        <BodyWrapper>
          {founder.map((user) => (
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
                  <CS.Icon onClick={() => handleClose(user)}>id-card</CS.Icon>
                  <CS.Icon onClick={() => editFoundersHandler(user.id)}>edit</CS.Icon>
                </S.IconBox>
              </S.WebTableCell>
            </TableRow>
          ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td>No Founders..</td>
          </tr>
        </S.EmptyMsg>
      )}
      {/* <FoundersModal
        openModal={iconModal}
        handleClose={() => setIconModal(false)}
        handleDelete={() => {
          setDeleteModal(true);
        }}
        handleEdit={() => {
          setEditMode(true);
        }}
      /> */}
      <DeleteModal
        openModal={deleteModal}
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => {
          deleteFounder(deleteId);
          setDeleteModal(false);
          setIconModal(false);
        }}
      />
      <IdCardModal cardData={idCardData} openModal={open} handleClose={handleClose} />

      {image && (
        <tbody>
          <tr>
            <td>
              <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />
            </td>
          </tr>
        </tbody>
      )}

      <FoundersModal openModal={editMode} handleClose={() => setEditMode(false)} cb={updateFounders} editMode={editMode} id={editId} />
    </>
  );
};

export default Body;
