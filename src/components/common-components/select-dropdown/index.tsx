import React, { useState } from "react";
import { MenuItem } from "@mui/material";

import S from "./selectDropdown.styled";

const SelectDropDown = () => {
  const [groupName, setGroupName] = useState("Farmer Group");
  return (
    <S.SelectInput select value={groupName} onChange={(e) => setGroupName(e.target.value)}>
      <MenuItem defaultValue="Farmer Group" value="Farmer Group">
        Farmer Group
      </MenuItem>
      <MenuItem value="farmer group 1">Farmer Group 1</MenuItem>
      <MenuItem value="farmer group 2">Farmer Group 2</MenuItem>
      <MenuItem value="farmer group 3">Farmer Group 3</MenuItem>
    </S.SelectInput>
  );
};

export default SelectDropDown;
