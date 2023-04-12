import { DEFAULT_GROUP_FILTER, useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { FarmersGroup } from "../../../utils/context/farmersGroup";
import S from "./selectDropdown.styled";
import { useFetch } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";

const SelectDropDown = () => {
  //state values
  const { groupFilter, setGroupFilter, checkboxUnselectAll } = useFarmerDetailsContext();

  //constants
  const {
    result: { data: farmersGroupById },
    formatChangeSuccess: isSucess,
  } = useFetch(ENDPOINTS.farmerGroup);

  //functions
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
