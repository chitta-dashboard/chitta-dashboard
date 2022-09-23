import React, { useState,useRef } from "react";
import { Avatar, Checkbox, Stack } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";

import BodyWrapper from "../../../custom-tables/body";
import userPic from "../../../../assets/images/user.png";

import CS from "../../../common-styles/commonStyles.styled";
import FarmersDetailsModal from "../../../icon-modals/farmers-detail-modal";
import IdCardBody from "../../../id-card/id-card-body";
import FarmerDetailsForm from "../../../../views/farmer-detail-page/FarmerDetailsForm";
import S from "./body.styled";

interface Props{
  users:any
  setUsers: any
  handleChange: any
  
}

const Body = (props: Props) => {
  
  const idCardRef = useRef<HTMLDivElement>();
  const farmerDetailFormRef = useRef<HTMLDivElement>();
  const navigate = useNavigate();
  
  const [farmersDetailsIcon, setFarmersDetailsIcon] = useState(false);
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

  const NavigateToFarmerDetailForm = (id: number, e: any) => {
    navigate(`/farmers-details/${id}`);
  }
  
  return (
    <>
      <BodyWrapper>
        <tr style={{ display: "none" }}>
         <td>
       <IdCardBody ref={idCardRef} />
       <FarmerDetailsForm ref={farmerDetailFormRef  } />
         </td>
     </tr>
        {props.users.map((user:any) => (
          <S.CustomTableRow key={user.id} onClick={(e)=>NavigateToFarmerDetailForm(user.id,e)}>
            <S.RowCheckCell onClick={(e)=>{e.stopPropagation()}}>
              <Checkbox
                name={user.id}
                onChange={props.handleChange}
                checked={user?.isChecked || false} 
              />
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
                <CS.Icon>delete</CS.Icon>
                <CS.Icon onClick={()=>generateIdCard()} >id-card</CS.Icon>
                <CS.Icon>edit</CS.Icon>
                <CS.Icon onClick={()=>generateFarmerDetailForm()} >download</CS.Icon>
              </S.IconBox>
            </S.WebTableCell>
          </S.CustomTableRow>
        ))}
      </BodyWrapper>
      <FarmersDetailsModal open={farmersDetailsIcon} handleClose={farmersDetailsIconModalHandler} generateIdCard={() =>generateIdCard()} generateFarmerDetailForm={()=>generateFarmerDetailForm()} />
    </>
  );
};

export default Body;
