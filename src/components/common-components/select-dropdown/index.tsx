import React, { useState } from "react";
import { MenuItem } from "@mui/material";

import { S } from "./selectDropdown.styled";

const SelectDropDown = () => {
  const [groupName, setGroupName] = useState("");
  return (
    <div>
      <S.SelectInput select value={groupName} onChange={(e) => setGroupName(e.target.value)}>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </S.SelectInput>
    </div>
  );
};

export default SelectDropDown;
