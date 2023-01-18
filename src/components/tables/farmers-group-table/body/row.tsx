import { FC, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FarmersGroup } from "../../../../utils/context/farmersGroup";
import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { IResolution } from "../../../../utils/context/resolution";
import { useDelete, useEdit, useFetch } from "../../../../utils/hooks/query";
import { useAuthContext } from "../../../../utils/context/auth";
import { Message, ENDPOINTS } from "../../../../utils/constants";
import FarmersGroupIconModal from "../../../icon-modals/farmers-group-icon-modal";
import FarmersGroupModal from "../../../modals/farmers-group-modal";
import DeleteModal from "../../../modals/delete-modal";
import ConfirmationModal from "../../../modals/confirmation-modal";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";
import Toast from "../../../../utils/toast";

interface FarmersGroupRowProp {
  user: FarmersGroup;
}

const FarmersGroupRow: FC<FarmersGroupRowProp> = ({ user }) => {
  const { setGroupFilter, groupFilter } = useFarmerDetailsContext();

  const {
    formatChangeSuccess: isSuccess,
    result: { data: farmerDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  const {
    formatChangeSuccess: isSuccessFarmerGroup,
    result: { data: farmerGroupById },
  } = useFetch(ENDPOINTS.farmerGroup);
  const {
    formatChangeSuccess: isSuccessFarmerResolution,
    result: { data: farmerResolutionById },
  } = useFetch(ENDPOINTS.resolutions);
  const { mutate: editFarmer } = useEdit(ENDPOINTS.farmerDetails);
  const { addNotification } = useAuthContext();
  const navigate = useNavigate();
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editData, setEditData] = useState<FarmersGroup>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const { mutate: farmerGroupDelete } = useDelete(ENDPOINTS.farmerGroup);
  const { mutate: farmerGroupEdit } = useEdit(ENDPOINTS.farmerGroup);
  const { mutate: resolutionEdit } = useEdit(ENDPOINTS.resolutions);

  // Tab IconModal Open & Close Handler
  const iconModalHandler = () => setIconModal(!iconModal);

  //Edit Farmers Group Handler
  const editFarmersGroupHandler = () => setEditMode(!editMode);

  //Update FarmerGroup Handler
  const updateFarmerGroup = (data: FarmersGroup) => {
    setEditData(data);
    confirmModalHandler();
  };

  // Delete Modal
  const deleteModalHandler = () => setDeleteModal(!deleteModal);

  // confirm Modal Handler
  const confirmModalHandler = () => setConfirmModal(!confirmModal);

  //Redirect to Farmers Details Group Filter handler.
  const selectGroupHandler = (groupName: string) => {
    setGroupFilter(groupName);
    navigate(`/farmers-details`);
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
          <CS.Icon onClick={deleteModalHandler} deleteicon={user?.members?.length > 0 ? 1 : 0}>
            delete
          </CS.Icon>
          <CS.Icon onClick={editFarmersGroupHandler}>edit</CS.Icon>
        </S.IconBox>
        <FarmersGroupIconModal
          open={iconModal}
          handleClose={() => setIconModal(false)}
          handleDelete={() => setDeleteModal(true)}
          handleEdit={() => setEditMode(true)}
          deleteicon={user?.members?.length > 0 ? 1 : 0}
        />
        <DeleteModal
          openModal={deleteModal}
          handleClose={() => setDeleteModal(false)}
          handleDelete={() => {
            farmerGroupDelete({
              id: user.id,
              successCb: () => {
                Toast({ message: "Farmer group removed successfully.", type: "success" });
              },
              errorCb: () => {
                Toast({ message: "Request failed, please try again.", type: "error" });
              },
            });
            setDeleteModal(false);
            setIconModal(false);
            addNotification({ id: `delete${user.id}`, message: Message(user.groupName).deleteFarmGroup });
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
            if (isSuccess && isSuccessFarmerGroup && editData && editMode) {
              const editFarmerGroupName = farmerGroupById[editData.id].groupName;
              let newFarmerDetails = Object.values(farmerDetailsById as farmerDetail[])
                .filter((item) => item.group === editFarmerGroupName)
                .map((name) => {
                  return { ...name, group: editData.groupName };
                });
              if (isSuccess && isSuccessFarmerResolution && editData && editMode) {
                const editResolutionGroupName = farmerGroupById[editData.id].groupName;
                let newResolutionDetails = Object.values(farmerResolutionById as IResolution[])
                  .filter((item) => item.groupName === editResolutionGroupName)
                  .map((name) => {
                    return { ...name, groupName: editData.groupName };
                  });
                farmerGroupEdit({
                  editedData: editData,
                  successCb: () => {
                    Toast({ message: "Farmer group updated successfully.", type: "success" });
                    newFarmerDetails.length > 0 &&
                      editFarmer({
                        editedData: newFarmerDetails,
                        successCb: () => {
                          Toast({ message: "Farmer Edited Successfully", type: "success" });
                        },
                        errorCb: () => {
                          Toast({ message: "Request failed! Please try again", type: "error" });
                        },
                      });
                    newResolutionDetails.length > 0 &&
                      resolutionEdit({
                        editedData: newResolutionDetails,
                        successCb: () => {
                          Toast({ message: "Resolution Edited Successfully", type: "success" });
                        },
                        errorCb: () => {
                          Toast({ message: "Request failed! Please try again", type: "error" });
                        },
                      });
                  },
                  errorCb: () => {
                    Toast({ message: "Request failed, please try again.", type: "error" });
                  },
                });
                setEditMode(false);
                setConfirmModal(false);
                setIconModal(false);
              }
            }
          }}
        />
      </S.WebTableCell>
    </S.Row>
  );
};

export default FarmersGroupRow;
