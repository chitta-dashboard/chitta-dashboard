import { useState } from "react";
import { TableRow } from "@mui/material";

import BodyWrapper from "../../../custom-tables/body";
import FarmersGroupModal from "../../../icon-modals/farmers-group-modal";
import DeleteModal from "../../../modals/delete-modal";
import { useFarmerGroupDetailsContext } from "../../../../utils/context/farmersGroup";
import AddFarmersGroupModal from "../../../modals/farmers-group-modal";
import { IAddFarmersGroupFormInput } from "../../../modals/type/formInputs";

import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";

const Body = () => {
  const { farmerGroupList, editFarmerGroupDetail, deleteFarmerGroupDetail } = useFarmerGroupDetailsContext();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  // const [memberId, setMemberId] = useState<string>("");

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
  //Edit FarmerGroups Handler
  const editFarmerGroupHandler = (id: string) => {
    setEditMode(!editMode);
    setEditId(id);
  };
  //Update FarmerGroup Handler
  const updateFarmerGroup = (data: IAddFarmersGroupFormInput) => {
    setIconModal(false);
    editFarmerGroupDetail({ ...data, id: editId });
  };

  return (
    <>
      <BodyWrapper>
        {farmerGroupList.map((farmersGroup) => {
          return (
            <TableRow key={farmersGroup.id}>
              <S.TabCell>
                <CS.Icon onClick={() => iconModalHandler(farmersGroup.id as string)}>three-dots</CS.Icon>
              </S.TabCell>
              <S.Cell title="குழுபெயர்">{farmersGroup.groupName}</S.Cell>
              <S.Cell title="குழு விவரங்கள்">{farmersGroup.explanation}</S.Cell>
              <S.WebTableCell>
                <S.IconBox>
                  <CS.Icon onClick={() => deleteModalHandler(farmersGroup.id as string)}>delete</CS.Icon>
                  <CS.Icon onClick={() => editFarmerGroupHandler(farmersGroup.id as string)}>edit</CS.Icon>
                </S.IconBox>
              </S.WebTableCell>
            </TableRow>
          );
        })}
      </BodyWrapper>
      <FarmersGroupModal
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
          deleteFarmerGroupDetail(deleteId);
          setDeleteModal(false);
          setIconModal(false);
        }}
      />
      <AddFarmersGroupModal openModal={editMode} handleClose={() => setEditMode(false)} cb={updateFarmerGroup} editMode={editMode} id={editId} />
    </>
  );
};

export default Body;
