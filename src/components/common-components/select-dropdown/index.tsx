// import { DEFAULT_GROUP_FILTER, useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { DEFAULT_GROUP_FILTER, setGroupFilter } from "../../../utils/store/slice/farmerDetails";
import { useFarmersGroupContext, FarmersGroup } from "../../../utils/context/farmersGroup";
import S from "./selectDropdown.styled";
import { useFetch } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";

const SelectDropDown = () => {
  // const { groupFilter, setGroupFilter } = useFarmerDetailsContext();
  const dispatch = useDispatch();
  const { groupFilter } = useSelector((state: RootState) => state.farmerDetails);
  const { result, formatChangeSuccess: isSucess } = useFetch(ENDPOINTS.farmerGroup);
  const { data: farmersGroupById } = result;
  // const { farmersGroupById } = useFarmersGroupContext();

  const selectHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setGroupFilter(event.target.value));
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
