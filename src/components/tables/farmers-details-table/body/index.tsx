import React, { useState,useRef } from "react";
import { TableRow, Avatar, Checkbox, Stack } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import {fileValidation} from '../../../../utils/const/const';
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import { useFarmerDetailsContext } from "../../../../utils/context/farmers-details";
import BodyWrapper from "../../../custom-tables/body";
import userPic from "../../../../assets/images/user.png";

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

const farmersDetails: FarmersDetailsType[] = [
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
  const idCardRef = useRef<HTMLDivElement>();
  const farmerDetailFormRef = useRef<HTMLDivElement>();
  
  const [image, setImage] = useState("");
  const [userId,setUserId] = useState<number>(-1);
  const [farmersDetailsIcon, setFarmersDetailsIcon] = useState(false);

  const hiddenFileInput:any = useRef<HTMLInputElement>();
  const {farmersList,editTableIcon} = useFarmerDetailsContext();



  const getURL = (id:number)=>{
    let result = farmersList.filter(item=>{
      return item.id === id ? item.profile : null
    })
    let data = result.length > 0 ? result[0]['profile'] : undefined
    return data;
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>|any)=>{
    let isValid = e.target && fileValidation(e.target.files[0].name);
    (e.target.files && isValid) && setImage(window.URL.createObjectURL(e.target.files[0]))
  }
   
  const handleIconClick = (id:number)=>{
     hiddenFileInput && hiddenFileInput.current.click()
     setUserId(id);
  }

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

 const handleCroppedImage = (image:string) => {
  editTableIcon({id:userId,profile:image,name:'image'})
 };

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
                  <S.AvatarImg alt="User-img" src={getURL(user.id) ? getURL(user.id) : userPic} />
                  <S.EditBox onClick={()=>handleIconClick(user.id)}>
                    <S.EditIcon>edit</S.EditIcon>
                    <S.HiddenInput type='file' ref={hiddenFileInput} onChange={handleInputChange}/>
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
          </TableRow>
        ))}
      </BodyWrapper>
      <FarmersDetailsModal open={farmersDetailsIcon} handleClose={farmersDetailsIconModalHandler} generateIdCard={() =>generateIdCard()} generateFarmerDetailForm={()=>generateFarmerDetailForm()} />
      {image && (
        <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />
      )}
    </>
  );
};

export default Body;
