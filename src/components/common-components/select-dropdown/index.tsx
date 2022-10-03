import React from "react";
import { MenuItem } from "@mui/material";
import { useFarmerDetailsContext } from "../../../utils/context/farmersDetails";

import S from "./selectDropdown.styled";

const SelectDropDown = () => {
  const { groupFilter, setGroupFilter } = useFarmerDetailsContext();
  const selectHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGroupFilter(event.target.value);
  };
  return (
    // <S.SelectInput select value={groupFilter} onChange={selectHandler} defaultValue="விவசாயிகள் சங்கம்-1">
    <S.SelectInput select value={groupFilter} onChange={selectHandler}>
      <MenuItem value="all">Farmer Groups</MenuItem>
      <MenuItem value="விவசாயிகள் சங்கம்-1">விவசாயிகள் சங்கம்-1</MenuItem>
      <MenuItem value="விவசாயிகள் சங்கம்-2">விவசாயிகள் சங்கம்-2</MenuItem>
      <MenuItem value="விவசாயிகள் சங்கம்-3">விவசாயிகள் சங்கம்-3</MenuItem>
    </S.SelectInput>
  );
};

export default SelectDropDown;
