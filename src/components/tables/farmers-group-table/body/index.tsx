import React, { useState } from "react";
import { TableRow } from "@mui/material";

import BodyWrapper from "../../../custom-tables/body";

import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";
import FarmersGroupModal from "../../../icon-modals/farmers-group-modal";
// import DeleteModal from "../../../modals/delete-modal";
import { farmerGroupDetail, useFarmerGroupDetailsContext } from "../../../../utils/context/farmers-group";

const Body = () => {
  const { farmerGroupList } = useFarmerGroupDetailsContext();

  // const [farmersGroups, setFarmersGroup] = useState(farmerGroupList);
  // const [deleteModal, setDeleteModal] = useState(false);
  // const [deleteId, setDeleteId] = useState(0);

  const [farmerGroupsIcon, setFarmersGroupIcon] = useState(false);

  //farmersGroups Delete Modal
  // const farmersGroupDeleteModal = (id: number) => {
  //   setDeleteModal(!deleteModal);
  //   setDeleteId(id);
  // };

  // //farmersGroups Delete Handler
  // const deleteFarmersGroup = (id: number) => {
  //   const filterFarmersGroups = farmersGroups.filter((user) => user.id !== id);
  //   setFarmersGroup(filterFarmersGroups);
  //   setDeleteModal(!deleteModal);
  // };

  //Tab Icon Open & Close Handler
  const farmersGroupsIconModalHandler = () => {
    setFarmersGroupIcon(!farmerGroupsIcon);
  };

  return (
    <>
      <BodyWrapper>
        {farmerGroupList.map((farmersGroup: farmerGroupDetail) => {
          return (
            <TableRow key={farmersGroup.id}>
              <S.WebTableCell>{farmersGroup.id}</S.WebTableCell>
              <S.TabCell>
                <div># {farmersGroup.id}</div>
                <div>
                  <CS.Icon onClick={farmersGroupsIconModalHandler}>three-dots</CS.Icon>
                </div>
              </S.TabCell>
              <S.Cell title="குழுபெயர்">{farmersGroup.groupName}</S.Cell>
              <S.Cell title="குழு விவரங்கள்">{farmersGroup.description}</S.Cell>
              <S.WebTableCell>
                <S.IconBox>
                  {/* <CS.Icon onClick={() => farmersGroupDeleteModal(farmersGroup.id)}>delete</CS.Icon> */}
                  <CS.Icon>delete</CS.Icon>
                  <CS.Icon>edit</CS.Icon>
                </S.IconBox>
              </S.WebTableCell>
            </TableRow>
          );
        })}
      </BodyWrapper>
      <FarmersGroupModal open={farmerGroupsIcon} handleClose={farmersGroupsIconModalHandler} />
      {/* <DeleteModal openModal={deleteModal} handleClose={farmersGroupDeleteModal} deleteFarmersGroup={deleteFarmersGroup} deleteId={deleteId} /> */}
    </>
  );
};

export default Body;
