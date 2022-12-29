import { createSlice } from "@reduxjs/toolkit";
import { NORMAL, SortOrder } from "../../constants";

//Group Filter by Member
export const customMemberFilter = {
  ALL: 1,
  WITH_MEMBERS: 2,
  WITHOUT_MEMBERS: 3,
};

export type IFarmersGroup = {
  id: string;
  groupName: string;
  explanation: string;
  chairman: string;
  treasurer: string;
  secretary: string;
  members: string[];
};

export interface IFarmersGroupSlice {
  farmersGroupById: { [id: string]: IFarmersGroup };
  searchFilter: string;
  memberFilter: number;
  sortFilter: SortOrder;
}

const initialState: IFarmersGroupSlice = {
  farmersGroupById: {
    a: {
      id: "a",
      groupName: "விவசாயிகள் சங்கம்-1",
      explanation: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "option-1",
      treasurer: "option-3",
      secretary: "option-2",
      members: ["a", "d", "e", "g", "h"],
    },
    b: {
      id: "b",
      groupName: "விவசாயிகள் சங்கம்-2",
      explanation: "இந்த குழு சோழர் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "option-2",
      treasurer: "option-3",
      secretary: "option-2",
      members: [],
    },
    c: {
      id: "c",
      groupName: "விவசாயிகள் சங்கம்-3",
      explanation: "இந்த குழு பாண்டியன் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "option-3",
      treasurer: "option-3",
      secretary: "option-3",
      members: ["b", "c", "f", "i", "j"],
    },
  },
  searchFilter: "",
  memberFilter: customMemberFilter.ALL,
  sortFilter: NORMAL,
};

const farmersGroupSlice = createSlice({
  name: "farmersGroup",
  initialState,
  reducers: {},
});

export const farmersGroupReducer = farmersGroupSlice.reducer;
