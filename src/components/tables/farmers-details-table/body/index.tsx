import { useState, useRef, useEffect } from "react";
import { Checkbox, Stack, TableRow } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { fileValidation, searchWord, sortObj } from "../../../../utils/constants";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import BodyWrapper from "../../../custom-tables/body";
import userPic from "../../../../assets/images/user.png";
import DeleteModal from "../../../modals/delete-modal";
import FarmersDetailsModal from "../../../icon-modals/farmers-detail-modal";
import FarmerDetailsForm from "../../../../views/farmer-detail-page/FarmerDetailsForm";
import AddFarmersDetailsModal from "../../../modals/farmers-details-modal";
import { IAddFarmersDetailsFormInput } from "../../../modals/type/formInputs";
import IdCardModal from "../../../modals/id-download-modal";
import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";

const Body = () => {
  const {
    farmersDetailsById: listData,
    editTableIcon,
    editFarmerDetail,
    deleteFarmerDetail,
    searchFilter,
    checkboxSelect,
    selectedFarmers,
    sortFilter,
    groupFilter,
  } = useFarmerDetailsContext();
  const [farmersList, setFarmersList] = useState<farmerDetail[]>(Object.values(listData));
  const [farmersListGroup, setFarmersListGroup] = useState<farmerDetail[]>(Object.values(listData));
  const [farmersListSearch, setFarmersListSearch] = useState<farmerDetail[]>(Object.values(listData));
  const [farmersListSort, setFarmersListSort] = useState<farmerDetail[]>(Object.values(listData));
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const farmerDetailFormRef = useRef<HTMLDivElement>();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [farmerIdtoPrint, setFarmerIdtoPrint] = useState<number | string>();
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const [idCardData, setIdCardData] = useState<farmerDetail>();

  useEffect(() => {
    setFarmersListGroup(groupFilter === "all" ? Object.values(listData) : Object.values(listData).filter((list) => list.group === groupFilter));
  }, [groupFilter, listData]);

  useEffect(() => {
    setFarmersListSearch(farmersListGroup.filter((farmer) => searchWord(farmer.name, searchFilter)));
  }, [searchFilter, farmersListGroup]);

  useEffect(() => {
    setFarmersListSort(sortObj<farmerDetail>(farmersListSearch, sortFilter, "name"));
  }, [farmersListSearch, sortFilter]);

  useEffect(() => {
    setFarmersList(farmersListSort);
  }, [farmersListSort]);

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

  // Delete Modal
  const deleteModalHandler = (id: string) => {
    setDeleteModal(!deleteModal);
    setDeleteId(id);
  };

  const getURL = (id: string) => {
    let result = Object.values(farmersList).filter((item) => {
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

  const generateFarmerDetailForm = useReactToPrint({
    documentTitle: `Nerkathir_User_Form_${+new Date()}`,
    content: () => farmerDetailFormRef.current as HTMLDivElement,
  });

  const NavigateToFarmerDetailForm = (farmerId: string) => {
    navigate(`/farmers-details/${farmerId}`);
  };

  const handleCroppedImage = (image: string) => {
    if (!image) return;
    let result = Object.values(farmersList).filter((item) => {
      return item.id === userId;
    });
    result[0]["profile"] = image;
    editTableIcon({ ...result[0] });
  };

  const handleClose = (user?: farmerDetail) => {
    setOpen(!open);
    setIdCardData(user);
  };

  return (
    <>
      {farmersList.length > 0 ? (
        <BodyWrapper>
          <tr style={{ display: "none" }}>
            <td>
              <FarmerDetailsForm ref={farmerDetailFormRef} farmerIdtoPrint={farmerIdtoPrint} />
            </td>
          </tr>
          {farmersList.map((user: farmerDetail) => (
            <TableRow key={user.id} onClick={() => NavigateToFarmerDetailForm(user.id)}>
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
                      <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
                    </S.EditBox>
                  </S.AvatarBox>
                  {user.name}
                </S.NameStack>
              </S.Cell>
              <S.Cell title="உறுப்பினர் எண்">{user.membershipId}</S.Cell>
              <S.Cell title="பிறந்த தேதி">{user.dob}</S.Cell>
              <S.Cell title="கைபேசி எண்">{user.phoneNumber}</S.Cell>
              <S.Cell title="குழு பெயர்">{user.group}</S.Cell>
              <S.WebTableCell onClick={(e) => e.stopPropagation()}>
                <S.IconBox>
                  <CS.Icon onClick={() => deleteModalHandler(user.id)}>delete</CS.Icon>
                  <CS.Icon onClick={() => handleClose(user)}>id-card</CS.Icon>
                  <CS.Icon onClick={() => editFarmerDetailHandler(user.id)}>edit</CS.Icon>
                  <CS.Icon
                    onClick={async () => {
                      await setFarmerIdtoPrint(user.id);
                      generateFarmerDetailForm();
                    }}
                  >
                    download
                  </CS.Icon>
                </S.IconBox>
              </S.WebTableCell>
            </TableRow>
          ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td>No Farmers Details..</td>
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
      <IdCardModal cardData={idCardData} openModal={open} handleClose={handleClose} />

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
