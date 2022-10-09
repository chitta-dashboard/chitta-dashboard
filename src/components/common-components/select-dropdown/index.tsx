import React from "react";
import { useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { useFarmerGroupDetailsContext } from "../../../utils/context/farmersGroup";
import S from "./selectDropdown.styled";

const SelectDropDown = () => {
  const { groupFilter, setGroupFilter } = useFarmerDetailsContext();
  const { farmerGroupList } = useFarmerGroupDetailsContext();

  const selectHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGroupFilter(event.target.value);
  };

  return (
    <S.SelectInput select value={groupFilter} onChange={selectHandler}>
      <S.Option value="all">Farmer Groups</S.Option>
      {farmerGroupList.map((list) => (
        <S.Option key={list.id} value={list.groupName}>
          {list.groupName}
        </S.Option>
      ))}
    </S.SelectInput>
  );
};

export default SelectDropDown;
