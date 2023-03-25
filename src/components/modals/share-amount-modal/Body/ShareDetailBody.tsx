import { Dispatch, FC, SetStateAction } from "react";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import ToggleSwitch from "../../../../utils/ToggleSwitch";
import S from "./share-amount-modal.styled";
import peopleIcon from "../../../../assets/images/People-icon.svg";

interface CustomProps {
  setShareAmount: Dispatch<SetStateAction<number>>;
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}

const ShareDetailBody: FC<CustomProps> = ({ setShareAmount, toggle, setToggle }) => {
  //state values
  const { selectedFarmers } = useFarmerDetailsContext();

  //functions
  const shareAmountHandler = (e: any) => {
    setShareAmount(e.target.value);
  };

  return (
    <S.ShareDetailBodyContainer>
      <S.ShareModalSubContainer>
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
      </S.ShareModalSubContainer>
      <S.ToggleSwitchContainer>
        Include cloned certificate{selectedFarmers.length === 1 ? "" : "s"}
        <ToggleSwitch
          selected={toggle}
          toggleSelected={() => {
            setToggle(!toggle);
          }}
        />
      </S.ToggleSwitchContainer>
    </S.ShareDetailBodyContainer>
  );
};
export default ShareDetailBody;
