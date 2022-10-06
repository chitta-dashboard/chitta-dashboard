import React from "react";
import { MenuItem } from "@mui/material";
import { useFarmerDetailsContext } from "../../../utils/context/farmersDetails";
import { useFarmerGroupDetailsContext } from "../../../utils/context/farmersGroup";
import S from "./selectDropdown.styled";

const SelectDropDown = () => {
  const { groupFilter, setGroupFilter } = useFarmerDetailsContext();
  const { farmerGroupList } = useFarmerGroupDetailsContext();
  // console.log(
  // "farmerGroupList",
  // farmerGroupList.map((e) => e.groupName),
  // );

  const selectHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGroupFilter(event.target.value);
  };

  return (
    <S.SelectInput select value={groupFilter} onChange={selectHandler}>
      <MenuItem value="all">Farmer Groups</MenuItem>
      {farmerGroupList.map((list) => (
        <MenuItem key={list.id} value={list.groupName}>
          {list.groupName}
        </MenuItem>
      ))}
    </S.SelectInput>
  );
};

export default SelectDropDown;
