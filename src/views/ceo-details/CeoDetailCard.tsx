import { useRef } from "react";

import S from "./ceo-details.styled";
import ProfilePicture from "./../../assets/images/IdImage.png";

const CeoDetailsCard = () => {
  const hiddenFileInput: any = useRef<HTMLInputElement>();

  const handleIconClick = () => {
    hiddenFileInput && hiddenFileInput.current.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {};

  return (
    <S.CeoDetailCard>
      <S.CeoDetailData>
        <S.CeoDataLeft>
          <S.ProfilePictureBox>
            <S.CeoProfilePicture src={ProfilePicture} alt="profile picture" />
            <S.EditBox
              onClick={() => {
                handleIconClick();
              }}
            >
              <S.EditIcon>edit</S.EditIcon>
              <S.HiddenInput type="file" ref={hiddenFileInput} onChange={handleInputChange} />
            </S.EditBox>
          </S.ProfilePictureBox>
          <S.CeoData>
            <S.CeoName>Arokiyaraj Reddy</S.CeoName>
            <S.CeoAge>Age: 48</S.CeoAge>
            <S.CeoJoinedDate>Joined 28th Jul 2022</S.CeoJoinedDate>
          </S.CeoData>
        </S.CeoDataLeft>
        <S.CeoDataRight>
          <S.CeoData>
            <S.CeoInfo>கைபேசி எண்: </S.CeoInfo>
            <S.CeoInfo>பிறந்த தேதி:</S.CeoInfo>
            <S.CeoInfo>தகுதி:</S.CeoInfo>
          </S.CeoData>
          <S.CeoData>
            <S.CeoInfo>8940065783</S.CeoInfo>
            <S.CeoInfo>10/02/1969</S.CeoInfo>
            <S.CeoInfo>BBA, MBA</S.CeoInfo>
          </S.CeoData>
        </S.CeoDataRight>
      </S.CeoDetailData>
      <S.CeoDetailDescription>
        Morbi pretium semper ipsum, ut rhoncus ligula pellentesque non. In hac habitasse platea dictumst. Sed laoreet dictum libero, ac sagittis purus
        tincidunt sed. Duis non mi rhoncus, imperdiet urna id, suscipit elit.
      </S.CeoDetailDescription>
      <S.ButtonContainer>
        <S.CustomIconContainer>delete</S.CustomIconContainer>
        <S.CustomIconContainer>id-card</S.CustomIconContainer>
        <S.CustomIconContainer>edit</S.CustomIconContainer>
      </S.ButtonContainer>
    </S.CeoDetailCard>
  );
};

export default CeoDetailsCard;