import S from "./selectDropdown.styled";
import { ENDPOINTS } from "../../../utils/constants";
import { DEFAULT_GROUP_FILTER, useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { FarmersGroup } from "../../../utils/context/farmersGroup";
import { useFetch } from "../../../utils/hooks/query";

const SelectDropDown = () => {
  // state values
  const { groupFilter, setGroupFilter, checkboxUnselectAll } = useFarmerDetailsContext();
  // Queries
  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isSucess,
  } = useFetch(ENDPOINTS.farmerGroup);

  const selectHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGroupFilter(event.target.value);
    checkboxUnselectAll();
  };

  return (
    <S.SelectInput select value={groupFilter} onChange={selectHandler}>
      <S.Option value={DEFAULT_GROUP_FILTER}>Farmer Groups</S.Option>
      {Object.values(isSucess && (farmersGroupById as FarmersGroup)).map((list) => (
        <S.Option key={list.id} value={list.groupName}>
          {list.groupName}
        </S.Option>
      ))}
    </S.SelectInput>
  );
};

export default SelectDropDown;
