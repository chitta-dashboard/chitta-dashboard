import React, { useState, useRef } from "react";
import { TableRow, Checkbox, Stack } from "@mui/material";
import { useReactToPrint } from "react-to-print";

import BodyWrapper from "../../../custom-tables/body";
import DeleteModal from "../../../modals/delete-modal";

import CS from "../../../common-styles/commonStyles.styled";
import FarmersDetailsModal from "../../../icon-modals/farmers-detail-modal";
import IdCardBody from "../../../id-card/id-card-body";
import FarmerDetailsForm from "../../../../views/farmer-detail-page/FarmerDetailsForm";
import S from "./body.styled";
import { useFarmerDetailsContext } from "../../../../utils/context/farmers-details";

const Body = () => {
  const { farmersList } = useFarmerDetailsContext();
  const [farmersDetails, setFarmersDetails] = useState(farmersList);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const idCardRef = useRef<HTMLDivElement>();
  const farmerDetailFormRef = useRef<HTMLDivElement>();

  const [farmersDetailsIcon, setFarmersDetailsIcon] = useState(false);

  //farmers Details Delete Modal
  const farmersDetailsDeleteModal = (id: number) => {
    setDeleteModal(!deleteModal);
    setDeleteId(id);
  };

  //Farmers Details users Delete Handler
  const deleteFarmersDetails = (id: number) => {
    const filterFarmersDetails = farmersDetails.filter((user) => user.id !== id);
    setFarmersDetails(filterFarmersDetails);
    setDeleteModal(!deleteModal);
  };

  //Tab Icon Open & Close Handler
  const farmersDetailsIconModalHandler = () => {
    setFarmersDetailsIcon(!farmersDetailsIcon);
  };

  const generateIdCard = useReactToPrint({
    documentTitle: `Nerkathir_User_IDcard${+new Date()}`,
    content: () => idCardRef.current as HTMLDivElement,
  });

  const generateFarmerDetailForm = useReactToPrint({
    documentTitle: `Nerkathir_User_Form_${+new Date()}`,
    content: () => farmerDetailFormRef.current as HTMLDivElement,
  });

  return (
    <>
      <BodyWrapper>
        <tr style={{ display: "none" }}>
          <td>
            <IdCardBody ref={idCardRef} />
            <FarmerDetailsForm ref={farmerDetailFormRef} />
          </td>
        </tr>
        {farmersDetails.map((user) => (
          <TableRow key={user.id}>
            <S.RowCheckCell>
              <Checkbox />
            </S.RowCheckCell>
            <S.WebTableCell>{user.id}</S.WebTableCell>
            {/* for tablet view */}
            <S.TabCell>
              <S.TabCheckboxStack>
                <Checkbox />
                <S.TabIdStack>
                  #<S.IdBox>{user.id}</S.IdBox>
                </S.TabIdStack>
              </S.TabCheckboxStack>
              <Stack>
                <CS.Icon onClick={farmersDetailsIconModalHandler}>three-dots</CS.Icon>
              </Stack>
            </S.TabCell>
            <S.Cell title="பெயர்">
              <S.NameStack>
                <S.AvatarBox>
                  <S.AvatarImg alt="User-img" src={user.profile} />
                  <S.EditBox onClick={() => {}}>
                    <S.EditIcon>edit</S.EditIcon>
                  </S.EditBox>
                </S.AvatarBox>
                {user.name}
              </S.NameStack>
            </S.Cell>
            <S.Cell title="கைபேசி எண்">{user.mobileNo}</S.Cell>
            <S.Cell title="குழு பெயர்">{user.groupName}</S.Cell>
            <S.WebTableCell>
              <S.IconBox>
                <CS.Icon onClick={() => farmersDetailsDeleteModal(user.id)}>delete</CS.Icon>
                <CS.Icon onClick={() => generateIdCard()}>id-card</CS.Icon>
                <CS.Icon>edit</CS.Icon>
                <CS.Icon onClick={() => generateFarmerDetailForm()}>download</CS.Icon>
              </S.IconBox>
            </S.WebTableCell>
          </TableRow>
        ))}
      </BodyWrapper>
      <FarmersDetailsModal
        open={farmersDetailsIcon}
        handleClose={farmersDetailsIconModalHandler}
        generateIdCard={() => generateIdCard()}
        generateFarmerDetailForm={() => generateFarmerDetailForm()}
      />
      <DeleteModal openModal={deleteModal} handleClose={farmersDetailsDeleteModal} deleteFarmersDetails={deleteFarmersDetails} deleteId={deleteId} />
    </>
  );
};

export default Body;
