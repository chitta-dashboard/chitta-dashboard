import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { customMemberFilter, FarmersGroup, useFarmersGroupContext } from "../../../../utils/context/farmersGroup";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { searchWord, sortObj } from "../../../../utils/constants";
import BodyWrapper from "../../../custom-tables/body";
import FarmersGroupModal from "../../../icon-modals/farmers-group-modal";
import DeleteModal from "../../../modals/delete-modal";
import AddFarmersGroupModal from "../../../modals/farmers-group-modal";
import CS from "../../../common-styles/commonStyles.styled";
import S from "./body.styled";

const Body = () => {
  const { farmersGroupById: listData, editFarmersGroup, deleteFarmersGroup, searchFilter, sortFilter, memberFilter } = useFarmersGroupContext();
  const { setGroupFilter, groupFilter } = useFarmerDetailsContext();
  const navigate = useNavigate();
  const [farmersGroupList, setFarmersGroupList] = useState(Object.values(listData));
  const [farmersGroupMemberList, setFarmersGroupMemberList] = useState(Object.values(listData));
  const [farmersGroupListSearch, setFarmersGroupListSearch] = useState(Object.values(listData));
  const [farmersGroupListSort, setFarmersGroupListSort] = useState(Object.values(listData));
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  useEffect(() => {
    setFarmersGroupMemberList(
      customMemberFilter.ALL === memberFilter
        ? Object.values(listData)
        : customMemberFilter.WITH_MEMBERS === memberFilter
        ? Object.values(listData).filter((list) => list.members?.length !== 0)
        : Object.values(listData).filter((list) => list.members?.length === 0),
    );
  }, [memberFilter, listData]);

  useEffect(() => {
    setFarmersGroupListSearch(farmersGroupMemberList.filter((farmer) => searchWord(farmer.groupName, searchFilter)));
  }, [searchFilter, farmersGroupMemberList]);

  useEffect(() => {
    setFarmersGroupListSort(sortObj<FarmersGroup>(farmersGroupListSearch, sortFilter, "groupName"));
  }, [farmersGroupListSearch, sortFilter]);

  useEffect(() => {
    setFarmersGroupList(farmersGroupListSort);
  }, [farmersGroupListSort]);

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
  const updateFarmerGroup = (data: FarmersGroup) => {
    setIconModal(false);
    editFarmersGroup({ ...data, id: editId });
  };

  // Delete Modal
  const deleteModalHandler = (id: string) => {
    setDeleteModal(!deleteModal);
    setDeleteId(id);
  };

  //Farmer Details list hanlder.
  const selectGroupHandler = (groupName: string) => {
    setGroupFilter(groupName);
    navigate(`/farmers-details`, { replace: true });
  };

  return (
    <>
      {farmersGroupList.length > 0 ? (
        <BodyWrapper>
          {farmersGroupList.map((list) => {
            return (
              <S.Row key={list.id} onClick={() => selectGroupHandler(list.groupName)} select={list.groupName === groupFilter ? 1 : 0}>
                <S.TabCell>
                  <CS.Icon
                    onClick={(e) => {
                      e.stopPropagation();
                      iconModalHandler(list.id);
                    }}
                  >
                    three-dots
                  </CS.Icon>
                </S.TabCell>
                <S.Cell title="குழுபெயர்" ismember={list?.members?.length ? 1 : 0}>
                  {list.groupName}
                </S.Cell>
                <S.Cell title="எண்ணிக்கை">
                  <S.Icon>
                    <CS.Icon shade>farmer-count</CS.Icon>
                    <Typography>{list?.members?.length}</Typography>
                  </S.Icon>
                </S.Cell>
                <S.Cell title="குழு விவரங்கள்">{list.explanation}</S.Cell>
                <S.WebTableCell onClick={(e) => e.stopPropagation()}>
                  <S.IconBox>
                    <CS.Icon onClick={() => deleteModalHandler(list.id)}>delete</CS.Icon>
                    <CS.Icon onClick={() => editFarmerGroupHandler(list.id)}>edit</CS.Icon>
                  </S.IconBox>
                </S.WebTableCell>
              </S.Row>
            );
          })}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td> No Farmers Group..</td>
          </tr>
        </S.EmptyMsg>
      )}

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
          deleteFarmersGroup(deleteId);
          setDeleteModal(false);
          setIconModal(false);
        }}
      />
      <AddFarmersGroupModal openModal={editMode} handleClose={() => setEditMode(false)} cb={updateFarmerGroup} editMode={editMode} id={editId} />
    </>
  );
};

export default Body;
