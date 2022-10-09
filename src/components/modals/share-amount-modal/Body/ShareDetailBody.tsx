import { Dispatch, FC, SetStateAction } from "react";
import S from "./share-amount-modal.styled";
import peopleIcon from "../../../../assets/images/People-icon.svg";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";

interface CustomProps {
  setShareAmount: Dispatch<SetStateAction<number>>;
}

const ShareDetailBody: FC<CustomProps> = ({ setShareAmount }) => {
  const { selectedFarmers } = useFarmerDetailsContext();

  const shareAmountHandler = (e: any) => {
    setShareAmount(e.target.value);
  };

  return (
    <S.ShareDetailBodyContainer>
      <S.ShareDetailLeft>
        <S.ShareHolderCount>
          <img src={peopleIcon} alt="people icon" />
          {selectedFarmers.length}
        </S.ShareHolderCount>
        <S.ShareHolderText>Share Holder Amount</S.ShareHolderText>
      </S.ShareDetailLeft>
      <S.ShareDetailRight>
        <S.FloatingAmount>Amount</S.FloatingAmount>

        <S.CustomInput
          defaultValue={1000}
          onChange={(e) => {
            shareAmountHandler(e);
          }}
          type="number"
          min="1000"
        />
      </S.ShareDetailRight>
    </S.ShareDetailBodyContainer>
  );
};
export default ShareDetailBody;
