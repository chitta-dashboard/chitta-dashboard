import { useState, useRef, useEffect } from "react";
import { Checkbox, Stack } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { fileValidation, searchWord } from "../../../../utils/constants";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import BodyWrapper from "../../../custom-tables/body";
import userPic from "../../../../assets/images/user.png";
import DeleteModal from "../../../modals/delete-modal";
import FarmersDetailsModal from "../../../icon-modals/farmers-detail-modal";
import FarmerDetailsForm from "../../../../views/farmer-detail-page/FarmerDetailsForm";
import IdCardBody from "../../../id-card/id-card-body";
import AddFarmersDetailsModal from "../../../modals/farmers-details-modal";
import { IAddFarmersDetailsFormInput } from "../../../modals/type/formInputs";

import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";

const Body = () => {
  const idCardRef = useRef<HTMLDivElement>();
  const farmerDetailFormRef = useRef<HTMLDivElement>();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<string>("");

  const hiddenFileInput: any = useRef<HTMLInputElement>();

  const {
    farmersList: listData,
    editTableIcon,
    editFarmerDetail,
    deleteFarmerDetail,
    searchFilter,
    checkboxSelect,
    selectedFarmers,
  } = useFarmerDetailsContext();
  const [farmersList, setFarmersList] = useState(listData);

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  useEffect(() => {
    setFarmersList(listData.filter((farmer) => searchWord(farmer.name, searchFilter)));
  }, [listData, searchFilter]);

  // Delete Modal
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
  //Edit FarmerDetail Handler
  const editFarmerDetailHandler = (id: string) => {
    setEditMode(!editMode);
    setEditId(id);
  };
  //Update FarmerDetail Handler
  const updateFarmerDetail = (data: IAddFarmersDetailsFormInput & { id: string; membershipId: string }) => {
    setIconModal(false);
    editFarmerDetail(data);
  };

  const getURL = (id: string) => {
    let result = farmersList.filter((item) => {
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

  const generateIdCard = useReactToPrint({
    documentTitle: `Nerkathir_User_IDcard${+new Date()}`,
    content: () => idCardRef.current as HTMLDivElement,
  });

  const generateFarmerDetailForm = useReactToPrint({
    documentTitle: `Nerkathir_User_Form_${+new Date()}`,
    content: () => farmerDetailFormRef.current as HTMLDivElement,
  });

  const NavigateToFarmerDetailForm = (id: string) => {
    navigate(`/farmers-details/${id}`);
  };

  const handleCroppedImage = (image: string) => {
    let result = farmersList.filter((item) => {
      return item.id === userId;
    });
    result[0]["profile"] = image;
    editTableIcon({ ...result[0] });
  };

  return (
    <>
      {farmersList.length > 0 ? (
        <BodyWrapper>
          <tr style={{ display: "none" }}>
            <td>
              <IdCardBody ref={idCardRef} />
              <FarmerDetailsForm ref={farmerDetailFormRef} />
            </td>
          </tr>
          {farmersList.map((user: farmerDetail) => (
            <S.CustomTableRow key={user.id} onClick={() => NavigateToFarmerDetailForm(user.id)}>
              <S.RowCheckCell
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Checkbox
                  onChange={(e) => {
                    checkboxSelect(user.id);
                  }}
                  checked={selectedFarmers.includes(user.id)}
                />
              </S.RowCheckCell>
              <S.WebTableCell>{user.membershipId}</S.WebTableCell>
              {/* for tablet view*/}
              <S.TabCell
                onClick={(e) => {
                  e.stopPropagation();
                        handleIconClick(user.id);
                }}
              >
                <Checkbox
                  onChange={(e) => {
                    checkboxSelect(user.id);
                  }}
                  checked={selectedFarmers.includes(user.id)}
                />
                <Stack>
                  <CS.Icon onClick={() => iconModalHandler(user.id)}>three-dots</CS.Icon>
                </Stack>
              </S.TabCell>
              <S.Cell title="பெயர்">
                <S.NameStack>
                  <S.AvatarBox>
                    <S.AvatarImg alt="User-img" src={getURL(user.id) ? getURL(user.id) : userPic} />
                    <S.EditBox
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIconClick(user.id);
                      }}
                    >
                      <S.EditIcon>edit</S.EditIcon>
                      <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} />
                    </S.EditBox>
                  </S.AvatarBox>
                  {user.name}
                </S.NameStack>
              </S.Cell>
              <S.Cell title="உறுப்பினர் எண்">{user.membershipId}</S.Cell>
              <S.Cell title="கைபேசி எண்">{user.phoneNumber}</S.Cell>
              <S.Cell title="குழு பெயர்">{user.group}</S.Cell>
              <S.WebTableCell>
                <S.IconBox onClick={(e) => e.stopPropagation()}>
                  <CS.Icon onClick={() => deleteModalHandler(user.id)}>delete</CS.Icon>
                  <CS.Icon onClick={() => generateIdCard()}>id-card</CS.Icon>
                  <CS.Icon onClick={() => editFarmerDetailHandler(user.id)}>edit</CS.Icon>
                  <CS.Icon onClick={() => generateFarmerDetailForm()}>download</CS.Icon>
                </S.IconBox>
              </S.WebTableCell>
            </S.CustomTableRow>
          ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td> No Data</td>
          </tr>
        </S.EmptyMsg>
      )}
      <FarmersDetailsModal
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
          deleteFarmerDetail(deleteId);
          setDeleteModal(false);
          setIconModal(false);
        }}
      />
      <AddFarmersDetailsModal openModal={editMode} handleClose={() => setEditMode(false)} cb={updateFarmerDetail} editMode={editMode} id={editId} />
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
