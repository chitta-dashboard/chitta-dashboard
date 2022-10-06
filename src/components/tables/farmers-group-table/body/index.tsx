import { useEffect, useState } from "react";
import BodyWrapper from "../../../custom-tables/body";
import FarmersGroupModal from "../../../icon-modals/farmers-group-modal";
import DeleteModal from "../../../modals/delete-modal";
import { farmerGroupDetail, useFarmerGroupDetailsContext } from "../../../../utils/context/farmersGroup";
import AddFarmersGroupModal from "../../../modals/farmers-group-modal";
import { IAddFarmersGroupFormInput } from "../../../modals/type/formInputs";
import { searchWord, sortObj } from "../../../../utils/constants";
import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Body = () => {
  const {
    farmerGroupList: listData,
    editFarmerGroupDetail,
    deleteFarmerGroupDetail,
    searchFilter,
    sortFilter,
    // memberFilter,
  } = useFarmerGroupDetailsContext();
  const { setGroupFilter, groupFilter } = useFarmerDetailsContext();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  const [farmerGroupList, setFarmerGroupList] = useState(listData);

  // const [farmersGroupList, setFarmersGroupList] = useState(listData);
  const [farmerGroupListSearch, setFarmerGroupListSearch] = useState(listData);
  const [farmerGroupListSort, setFarmerGroupListSort] = useState(listData);

  // console.log(memberFilter);
  // console.log(
  // listData.filter((e) => e.members?.length > 1),
  // "check",
  // );
  // console.log(listData.filter((list) => list.members?.length > 0));

  // useEffect(() => {
  //   setFarmerGroupMembersList(

  //     memberFilter === "all"
  //       ? listData
  //       : memberFilter === "1"
  //       ? listData.filter((list) => list?.members?.length > 0)
  //       : listData.filter((list) => list.members?.length === 0),
  //   );
  // }, [memberFilter, listData]);

  useEffect(() => {
    setFarmerGroupListSearch(listData.filter((farmer) => searchWord(farmer.groupName, searchFilter)));
  }, [searchFilter, listData]);

  useEffect(() => {
    setFarmerGroupListSort(sortObj<farmerGroupDetail>(farmerGroupListSearch, sortFilter, "groupName"));
  }, [farmerGroupListSearch, sortFilter]);

  useEffect(() => {
    setFarmerGroupList(farmerGroupListSort);
  }, [farmerGroupListSort]);

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

  //Farmer Details list hanlder.
  const selectGroupHandler = (groupName: string) => {
    setGroupFilter(groupName);
    navigate(`/farmers-details`, { replace: true });
  };

  return (
    <>
      {farmerGroupList.length > 0 ? (
        <BodyWrapper>
          {farmerGroupList.map((farmersGroup) => {
            return (
              <S.Row
                key={farmersGroup.id}
                onClick={() => selectGroupHandler(farmersGroup.groupName)}
                select={farmersGroup.groupName === groupFilter ? 1 : 0}
              >
                <S.TabCell>
                  <CS.Icon
                    onClick={(e) => {
                      e.stopPropagation();
                      iconModalHandler(farmersGroup.id);
                    }}
                  >
                    three-dots
                  </CS.Icon>
                </S.TabCell>
                <S.Cell title="குழுபெயர்" ismember={farmersGroup?.members?.length ? 1 : 0}>
                  {farmersGroup.groupName}
                </S.Cell>
                <S.Cell title="எண்ணிக்கை">
                  <S.Icon>
                    <CS.Icon shade>farmer-count</CS.Icon>
                    <Typography>{farmersGroup?.members?.length}</Typography>
                  </S.Icon>
                </S.Cell>
                <S.Cell title="குழு விவரங்கள்">{farmersGroup.explanation}</S.Cell>
                <S.WebTableCell onClick={(e) => e.stopPropagation()}>
                  <S.IconBox>
                    <CS.Icon onClick={() => deleteModalHandler(farmersGroup.id)}>delete</CS.Icon>
                    <CS.Icon onClick={() => editFarmerGroupHandler(farmersGroup.id)}>edit</CS.Icon>
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
