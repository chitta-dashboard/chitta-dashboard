import S from "./toggleSwitch.styled";

interface Props {
  selected: boolean;
  toggleSelected: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const ToggleSwitch = (props: Props) => {
  //constants
  const { selected, toggleSelected } = props;

  return (
    <S.ToggleSwitchContainer onClick={toggleSelected}>
      <S.CustomSwitchButton colorToggle={selected === true ? true : false} />
    </S.ToggleSwitchContainer>
  );
};

export default ToggleSwitch;
