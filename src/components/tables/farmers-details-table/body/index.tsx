import React, { useState,useRef } from "react";
import { TableRow, Avatar, Checkbox, Stack } from "@mui/material";
import { useReactToPrint } from "react-to-print";

import BodyWrapper from "../../../custom-tables/body";
import userPic from "../../../../assets/images/user.png";
import DeleteModal from "../../../modals/delete-modal";

import CS from "../../../common-styles/commonStyles.styled";
import FarmersDetailsModal from "../../../icon-modals/farmers-detail-modal";
import IdCardBody from "../../../id-card/id-card-body";
import FarmerDetailsForm from "../../../../views/farmer-detail-page/FarmerDetailsForm";
import S from "./body.styled";

export interface FarmersDetailsType {
  id: number;
  image: string;
  name: string;
  mobileNo: number;
  farmersGroup: string;
}

const farmersDetailsList: FarmersDetailsType[] = [
  {
    id: 1,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 2,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 3,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 4,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 5,
    image: "image",
    name: "Arokiya Arokiya Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 6,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 7,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 8,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 9,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 10,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 11,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 12,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 13,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 14,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 15,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
];

const Body = () => {
  const [farmersDetails, setFarmersDetails] = useState(farmersDetailsList);
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
       <FarmerDetailsForm ref={farmerDetailFormRef  } />
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
                  <S.IdBox>{user.id}</S.IdBox>
                </S.TabIdStack>
              </S.TabCheckboxStack>
              <Stack>
                <CS.Icon onClick={farmersDetailsIconModalHandler}>three-dots</CS.Icon>
              </Stack>
            </S.TabCell>
            <S.Cell title="பெயர்">
              <S.NameStack>
                <S.AvatarBox>
                  <S.AvatarImg alt="User-img" src={userPic} />
                  <S.EditBox onClick={() => {}}>
                    <S.EditIcon>edit</S.EditIcon>
                  </S.EditBox>
                </S.AvatarBox>
              </S.NameStack>
            </S.Cell>
            <S.Cell title="கைபேசி எண்">{user.mobileNo}</S.Cell>
            <S.Cell title="விவசாயிகள் சங்கம்">{user.farmersGroup}</S.Cell>
            <S.WebTableCell>
              <S.IconBox>
                <CS.Icon onClick={() => farmersDetailsDeleteModal(user.id)}>delete</CS.Icon>
                <CS.Icon onClick={()=>generateIdCard()} >id-card</CS.Icon>
                <CS.Icon>edit</CS.Icon>
                <CS.Icon onClick={()=>generateFarmerDetailForm()} >download</CS.Icon>
              </S.IconBox>
            </S.WebTableCell>
          </TableRow>
        ))}
      </BodyWrapper>
      <FarmersDetailsModal open={farmersDetailsIcon} handleClose={farmersDetailsIconModalHandler} generateIdCard={() =>generateIdCard()} generateFarmerDetailForm={()=>generateFarmerDetailForm()} />
      <DeleteModal openModal={deleteModal} handleClose={farmersDetailsDeleteModal} deleteFarmersDetails={deleteFarmersDetails} deleteId={deleteId} />
    </>
  );
};

export default Body;
