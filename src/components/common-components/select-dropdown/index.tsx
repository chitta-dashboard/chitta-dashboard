import { useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { useFarmersGroupContext } from "../../../utils/context/farmersGroup";
import S from "./selectDropdown.styled";

const SelectDropDown = () => {
  const { groupFilter, setGroupFilter } = useFarmerDetailsContext();
  const { farmersGroupList } = useFarmersGroupContext();

  const selectHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGroupFilter(event.target.value);
  };

  return (
    <S.SelectInput select value={groupFilter} onChange={selectHandler}>
      <S.Option value="all">Farmer Groups</S.Option>
      {Object.values(farmersGroupList).map((list) => (
        <S.Option key={list.id} value={list.groupName}>
          {list.groupName}
        </S.Option>
      ))}
    </S.SelectInput>
  );
};

export default SelectDropDown;
