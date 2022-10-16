import React, { FC, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { FarmersGroup, useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import FarmersGroupIconModal from "../../../icon-modals/farmers-group-icon-modal";
import FarmersGroupModal from "../../../modals/farmers-group-modal";
import DeleteModal from "../../../modals/delete-modal";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";
import ConfirmationModal from "../../../modals/confirmation-modal";

interface FarmersGroupRowProp {
  user: FarmersGroup;
}

const FarmersGroupRow: FC<FarmersGroupRowProp> = ({ user }) => {
  const { editFarmersGroup, deleteFarmersGroup } = useFarmersGroupContext();
  const { setGroupFilter, groupFilter } = useFarmerDetailsContext();
  const navigate = useNavigate();
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editData, setEditData] = useState<FarmersGroup>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  // Tab IconModal Open & Close Handler
  const iconModalHandler = () => setIconModal(!iconModal);

  //Edit Farmers Group Handler
  const editFarmersGroupHandler = () => setEditMode(!editMode);

  //Update FarmerGroup Handler
  const updateFarmerGroup = (data: FarmersGroup) => {
    setEditData(data);
    confirmModalHandler();
    // editFarmersGroup({ ...data, id: editId });
  };

  // Delete Modal
  const deleteModalHandler = () => setDeleteModal(!deleteModal);

  // confirm Modal Handler
  const confirmModalHandler = () => setConfirmModal(!confirmModal);

  //Redirect to Farmers Details Group Filter handler.
  const selectGroupHandler = (groupName: string) => {
    setGroupFilter(groupName);
    navigate(`/farmers-details`, { replace: true });
  };

  return (
    <S.Row onClick={() => selectGroupHandler(user.groupName)} select={user.groupName === groupFilter ? 1 : 0}>
      <S.TabCell>
        <CS.Icon
          onClick={(e) => {
            e.stopPropagation();
            iconModalHandler();
          }}
        >
          three-dots
        </CS.Icon>
      </S.TabCell>
      <S.Cell title="குழுபெயர்" ismember={user?.members?.length ? 1 : 0}>
        {user.groupName}
      </S.Cell>
      <S.Cell title="எண்ணிக்கை">
        <S.Icon>
          <CS.Icon shade>farmer-count</CS.Icon>
          <Typography>{user?.members?.length}</Typography>
        </S.Icon>
      </S.Cell>
      <S.Cell title="குழு விவரங்கள்">{user.explanation}</S.Cell>
      <S.WebTableCell onClick={(e) => e.stopPropagation()}>
        <S.IconBox>
          <CS.Icon onClick={deleteModalHandler}>delete</CS.Icon>
          <CS.Icon onClick={editFarmersGroupHandler}>edit</CS.Icon>
        </S.IconBox>
        <FarmersGroupIconModal
          open={iconModal}
          handleClose={() => setIconModal(false)}
          handleDelete={() => setDeleteModal(true)}
          handleEdit={() => setEditMode(true)}
        />
        <DeleteModal
          openModal={deleteModal}
          handleClose={() => setDeleteModal(false)}
          handleDelete={() => {
            deleteFarmersGroup(user.id);
            setDeleteModal(false);
            setIconModal(false);
          }}
          deleteMessage={
            <>
              Do you want to remove <CS.Bold>{user.groupName}</CS.Bold> from Farmers Group?
            </>
          }
        />
        <FarmersGroupModal
          openModal={editMode}
          handleClose={() => setEditMode(false)}
          cb={updateFarmerGroup}
          editMode={editMode}
          id={user.id}
          members={user.members}
        />
        <ConfirmationModal
          openModal={confirmModal}
          handleClose={() => setConfirmModal(false)}
          yesAction={() => {
            !editMode && deleteFarmersGroup(user.id);
            console.log(editData);
            editMode && editData && editFarmersGroup(editData);
            setEditMode(false);
            setConfirmModal(false);
            setIconModal(false);
          }}
        />
      </S.WebTableCell>
    </S.Row>
  );
};

export default FarmersGroupRow;
