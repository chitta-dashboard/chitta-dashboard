import React, { useState,useRef, useEffect } from "react";
import { TableRow, Avatar } from "@mui/material";
import {fileValidation} from '../../../../utils/const/const';
import BodyWrapper from "../../../custom-tables/body";
import userPic from "../../../../assets/images/user.png";

import S from "./body.styled";
import CS from "../../../common-styles/commonStyles.styled";
import MdDetailModal from "../../../icon-modals/md-detail-modal";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";

export interface Users {
  id: number;
  image: string;
  name: string;
  mobileNo: number;
  degree: string;
}

const users: Users[] = [
  {
    id: 1,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 2,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 3,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 4,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 5,
    image: "image",
    name: "Arokiya Arokiya Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 6,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 7,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 8,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 9,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 10,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 11,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 12,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 13,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 14,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
  {
    id: 15,
    image: "image",
    name: "Arokiya",
    mobileNo: 8610010875,
    degree: "Higher Secondary",
  },
];

type croppedImageType = {image:string,id:number} 

const Body = () => {
  const [image, setImage] = useState("");
  const [croppedImage, setCroppedImage] = useState<croppedImageType| undefined>({} as croppedImageType);
  const [MdDetailsIcon, setMdDetailsIcon] = useState(false);
  const [userId,setUserId] = useState<number>(-1);
  const [isHovering, setIsHovering] = useState<number>(0);

  const hiddenFileInput:any = useRef<HTMLInputElement>();

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>|any)=>{
   let isValid = e.target && fileValidation(e.target.files[0].name);
   (e.target.files && isValid) && setImage(window.URL.createObjectURL(e.target.files[0]))
  }
  
  const handleIconClick = (id:number)=>{
    hiddenFileInput && hiddenFileInput.current.click()
    setUserId(id);
  }

  const mdDetailsIconModalHandler = () => {
    setMdDetailsIcon(!MdDetailsIcon);
  };

  

  const handleMouseOver = (id: number) => {
    setIsHovering(id);
  };

  const handleMouseOut = (id: number) => {
    setIsHovering(id);
  }

  const handleCroppedImage = (image:string) => {
    let data:croppedImageType = {
      image:image,
      id:userId
    }
    setCroppedImage(data);
  };

  return (
    <>
      <BodyWrapper>
        {users.map((user) => (
          <TableRow key={user.id}>
            <S.WebTableCell>{user.id}</S.WebTableCell>
            <S.TabCell>
              <div># {user.id}</div>
              <div>
                <CS.Icon onClick={mdDetailsIconModalHandler}>three-dots</CS.Icon>
              </div>
            </S.TabCell>
            <S.Cell title="பெயர்">
              <S.NameStack>
                <S.AvatarBox>
                  <S.AvatarImg alt="User-img" src={croppedImage?.id === user.id ? croppedImage?.image : userPic} />
                  <S.EditBox onClick={()=>handleIconClick(user.id)}>
                    <S.EditIcon>edit</S.EditIcon>
                    <S.HiddenInput type='file' ref={hiddenFileInput} onChange={handleInputChange}/>
                  </S.EditBox>
                </S.AvatarBox>
                {user.name}
              </S.NameStack>
            </S.Cell>
            <S.Cell title="கைபேசி எண்">{user.mobileNo}</S.Cell>
            <S.Cell title="தகுதி">{user.degree}</S.Cell>
            <S.WebTableCell>
              <S.IconBox>
                <CS.Icon>delete</CS.Icon>
                <CS.Icon>id-card</CS.Icon>
                <CS.Icon>edit</CS.Icon>
              </S.IconBox>
            </S.WebTableCell>
          </TableRow>
        ))}
      </BodyWrapper>
      <MdDetailModal open={MdDetailsIcon} handleClose={mdDetailsIconModalHandler} />
      {image && (
        <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />
      )}
    </>
  );
};

export default Body;
