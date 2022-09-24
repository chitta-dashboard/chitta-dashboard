import React, { useState, useRef } from "react";
import { Avatar, Checkbox, Stack } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { fileValidation } from "../../../../utils/const/const";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import { useFarmerDetailsContext } from "../../../../utils/context/farmers-details";
import BodyWrapper from "../../../custom-tables/body";
import userPic from "../../../../assets/images/user.png";

import CS from "../../../common-styles/commonStyles.styled";
import FarmersDetailsModal from "../../../icon-modals/farmers-detail-modal";
import IdCardBody from "../../../id-card/id-card-body";
import FarmerDetailsForm from "../../../../views/farmer-detail-page/FarmerDetailsForm";
import S from "./body.styled";

interface Props {
  users: any;
  setUsers: any;
  handleChange: any;
}

const Body = (props: Props) => {
  const idCardRef = useRef<HTMLDivElement>();
  const farmerDetailFormRef = useRef<HTMLDivElement>();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [userId, setUserId] = useState<number>(-1);
  const [farmersDetailsIcon, setFarmersDetailsIcon] = useState(false);

  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const { farmersList, editTableIcon } = useFarmerDetailsContext();

  const getURL = (id: number) => {
    let result = farmersList.filter((item) => {
      return item.id === id ? item.profile : null;
    });
    let data = result.length > 0 ? result[0]["profile"] : undefined;
    return data;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let isValid = e.target && fileValidation(e.target.files[0].name);
    e.target.files && isValid && setImage(window.URL.createObjectURL(e.target.files[0]));
  };

  const handleIconClick = (id: number) => {
    hiddenFileInput && hiddenFileInput.current.click();
    setUserId(id);
  };

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
  };

  const handleCroppedImage = (image: string) => {
    editTableIcon({ id: userId, profile: image, name: "image" });
  };

  return (
    <>
      <BodyWrapper>
        <tr style={{ display: "none" }}>
          <td>
            <IdCardBody ref={idCardRef} />
            <FarmerDetailsForm ref={farmerDetailFormRef} />
          </td>
        </tr>
        {props.users.map((user: any) => (
          <S.CustomTableRow key={user.id} onClick={(e) => NavigateToFarmerDetailForm(user.id, e)}>
            <S.RowCheckCell
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Checkbox name={user.id} onChange={props.handleChange} checked={user?.isChecked || false} />
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
                  <S.EditBox
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIconClick(user.id);
                    }}
                  >
                    <S.EditIcon>edit</S.EditIcon>
                    <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} />
                  </S.EditBox>
                </S.AvatarBox>
              </S.NameStack>
            </S.Cell>
            <S.Cell title="கைபேசி எண்">{user.mobileNo}</S.Cell>
            <S.Cell title="விவசாயிகள் சங்கம்">{user.farmersGroup}</S.Cell>
            <S.WebTableCell>
              <S.IconBox>
                <CS.Icon
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  delete
                </CS.Icon>
                <CS.Icon
                  onClick={(e) => {
                    e.stopPropagation();
                    generateIdCard();
                  }}
                >
                  id-card
                </CS.Icon>
                <CS.Icon
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  edit
                </CS.Icon>
                <CS.Icon
                  onClick={(e) => {
                    e.stopPropagation();
                    generateFarmerDetailForm();
                  }}
                >
                  download
                </CS.Icon>
              </S.IconBox>
            </S.WebTableCell>
          </S.CustomTableRow>
        ))}
      </BodyWrapper>
      <FarmersDetailsModal
        open={farmersDetailsIcon}
        handleClose={farmersDetailsIconModalHandler}
        generateIdCard={() => generateIdCard()}
        generateFarmerDetailForm={() => generateFarmerDetailForm()}
      />
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
};

export default Body;
