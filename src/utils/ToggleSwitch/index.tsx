import S from "./toggleSwitch.styled";

interface Props {
  selected: boolean;
  toggleSelected: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const ToggleSwitch = ({ selected, toggleSelected }: Props) => {
  return (
    <S.ToggleSwitchContainer onClick={toggleSelected}>
      <S.CustomSwitchButton colorToggle={selected === true ? true : false} />
    </S.ToggleSwitchContainer>
  );
};

export default ToggleSwitch;
