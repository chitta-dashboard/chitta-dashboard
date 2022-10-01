import { useEffect, useState } from "react";
import { TableRow } from "@mui/material";
import BodyWrapper from "../../../custom-tables/body";
import FarmersGroupModal from "../../../icon-modals/farmers-group-modal";
import DeleteModal from "../../../modals/delete-modal";
import { farmerGroupDetail, useFarmerGroupDetailsContext } from "../../../../utils/context/farmersGroup";
import AddFarmersGroupModal from "../../../modals/farmers-group-modal";
import { IAddFarmersGroupFormInput } from "../../../modals/type/formInputs";
import { searchWord, sortObj } from "../../../../utils/constants";
import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";

const Body = () => {
  const {
    farmerGroupList: listData,
    editFarmerGroupDetail,
    deleteFarmerGroupDetail,
    page,
    rowsPerPage,
    searchFilter,
    sortFilter,
  } = useFarmerGroupDetailsContext();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [farmerGroupList, setFarmerGroupList] = useState(listData);
  const [farmerGroupListSearch, setFarmerGroupListSearch] = useState(listData);
  const [farmerGroupListSort, setFarmerGroupListSort] = useState(listData);
  const [farmerGroupPaginate, setFarmerGroupPaginate] = useState(listData);

  useEffect(() => {
    setFarmerGroupListSearch(listData.filter((farmer) => searchWord(farmer.groupName, searchFilter)));
  }, [searchFilter, listData]);

  useEffect(() => {
    setFarmerGroupListSort(sortObj<farmerGroupDetail>(farmerGroupListSearch, sortFilter, "groupName"));
  }, [farmerGroupListSearch, sortFilter]);

  useEffect(() => {
    setFarmerGroupPaginate(farmerGroupListSort.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage));
  }, [farmerGroupListSort, page, rowsPerPage]);

  useEffect(() => {
    setFarmerGroupList(farmerGroupPaginate);
  }, [farmerGroupPaginate]);

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
      {farmerGroupList.length > 0 ? (
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
      ) : (
        <S.EmptyMsg>
          <tr>
            <td> No Data</td>
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
