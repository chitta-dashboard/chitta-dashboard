import React, { createContext, FC, useContext, useReducer } from "react";
import { NORMAL, SortOrder } from "../constants";

//ACTION TYPES

const FARMER_GROUP_DATA = "FARMER_GROUP_DATA";
const ADD_FARMERS_GROUP = "ADD_FARMERS_GROUP";
const EDIT_FARMERS_GROUP = "EDIT_FARMERS_GROUP";
const DELETE_FARMERS_GROUP = "DELETE_FARMERS_GROUP";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";
const MEMBER_FILTER = "MEMBER_FILTER";
const ADD_GROUP_MEMBER = "ADD_GROUP_MEMBER";
const REMOVE_GROUP_MEMBER = "REMOVE_GROUP_MEMBER";

//Group Filter by Member
export const customMemberFilter = {
  ALL: 1,
  WITH_MEMBERS: 2,
  WITHOUT_MEMBERS: 3,
};

export type FarmersGroup = {
  id: string;
  groupName: string;
  explanation: string;
  chairman: string;
  treasurer: string;
  secretary: string;
  members: string[];
};

interface IAddGroupMembers {
  id?: string;
  group?: string;
}

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmersGroupContextType {
  farmersGroupById: { [id: string]: FarmersGroup };
  searchFilter: string;
  memberFilter: number;
  sortFilter: SortOrder;
  getFarmersGroupData: (data: FarmersGroup) => void;
  setSortFilter: (sortOrder: SortOrder) => void;
  setSearchFilter: (searchText: string) => void;
  addFarmersGroup: (data: FarmersGroup) => void;
  editFarmersGroup: (data: FarmersGroup) => void;
  deleteFarmersGroup: (id: string) => void;
  addGroupMember: (data: IAddGroupMembers) => void;
  removeGroupMember: (groupMemberId?: string) => void;
  setMemberFilter: (value: number) => void;
}

const initialState: farmersGroupContextType = {
  // farmersGroupById: {
  //   a: {
  //     id: "a",
  //     groupName: "விவசாயிகள் சங்கம்-1",
  //     explanation: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
  //     chairman: "option-1",
  //     treasurer: "option-3",
  //     secretary: "option-2",
  //     members: ["a", "d", "e", "g", "h"],
  //   },
  //   b: {
  //     id: "b",
  //     groupName: "விவசாயிகள் சங்கம்-2",
  //     explanation: "இந்த குழு சோழர் என்பவரால் உருவாக்கப்பட்டது...",
  //     chairman: "option-2",
  //     treasurer: "option-3",
  //     secretary: "option-2",
  //     members: [],
  //   },
  //   c: {
  //     id: "c",
  //     groupName: "விவசாயிகள் சங்கம்-3",
  //     explanation: "இந்த குழு பாண்டியன் என்பவரால் உருவாக்கப்பட்டது...",
  //     chairman: "option-3",
  //     treasurer: "option-3",
  //     secretary: "option-3",
  //     members: ["b", "c", "f", "i", "j"],
  //   },
  // },
  farmersGroupById: {},
  searchFilter: "",
  sortFilter: NORMAL,
  getFarmersGroupData: () => {},
  setSortFilter: () => {},
  setSearchFilter: () => {},
  addFarmersGroup: () => {},
  editFarmersGroup: () => {},
  deleteFarmersGroup: () => {},
  addGroupMember: () => {},
  removeGroupMember: () => {},
  memberFilter: customMemberFilter.ALL,
  setMemberFilter: () => {},
};
const reducer = (state: farmersGroupContextType, action: any) => {
  switch (action.type) {
    case ADD_FARMERS_GROUP:
      return { ...state, farmersGroupById: { [action.payload.id]: action.payload, ...state.farmersGroupById } };

    case EDIT_FARMERS_GROUP:
      return { ...state, farmersGroupById: { ...state.farmersGroupById, [action.payload.id]: action.payload } };

    case DELETE_FARMERS_GROUP:
      delete state.farmersGroupById[action.payload];
      return { ...state, farmersGroupById: { ...state.farmersGroupById } };

    case ADD_GROUP_MEMBER:
      const farmersGroupList = Object.values(state.farmersGroupById);
      const groupIndex = farmersGroupList.findIndex((list) => list.groupName === action.payload.group);
      if (groupIndex >= 0) {
        // This condition is to avoid one more extra count in the members groups.
        !farmersGroupList[groupIndex].members.includes(action.payload.id) && farmersGroupList[groupIndex].members.push(action.payload.id);
        return { ...state };
      }
      return { ...state };

    case REMOVE_GROUP_MEMBER:
      const removeMemberIndex = Object.values(state.farmersGroupById)
        .map((farmersGroup) => farmersGroup.members)
        .findIndex((arr) => arr.includes(action.payload));
      if (removeMemberIndex !== -1) {
        const updatedMember = Object.values(state.farmersGroupById)[removeMemberIndex]["members"].filter((member) => member !== action.payload);
        return {
          ...state,
          farmersGroupById: {
            ...(Object.values(state.farmersGroupById)[removeMemberIndex].members = updatedMember),
          },
        };
      }
      return { ...state };

    case MEMBER_FILTER:
      return { ...state, memberFilter: action.payload };

    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };

    case FARMER_GROUP_DATA:
      return { ...state, farmersGroupById: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const farmersGroupContext = createContext<farmersGroupContextType>(initialState);

const FarmersGroupContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer<(reducer: any, initialState: any) => any>(reducer, initialState);

  const getFarmersGroupData = (data: FarmersGroup) => {
    dispatch({ type: FARMER_GROUP_DATA, payload: data });
  };

  const addFarmersGroup = (data: FarmersGroup) => {
    dispatch({ type: ADD_FARMERS_GROUP, payload: data });
  };

  const editFarmersGroup = (data: FarmersGroup) => {
    dispatch({ type: EDIT_FARMERS_GROUP, payload: data });
  };

  const deleteFarmersGroup = (id: string) => {
    dispatch({ type: DELETE_FARMERS_GROUP, payload: id });
  };

  const addGroupMember = (data: IAddGroupMembers) => {
    dispatch({ type: ADD_GROUP_MEMBER, payload: data });
  };
  const removeGroupMember = (groupMemberId: string) => {
    dispatch({ type: REMOVE_GROUP_MEMBER, payload: groupMemberId });
  };

  const setMemberFilter = (value: number) => {
    dispatch({ type: MEMBER_FILTER, payload: value });
  };

  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };

  const setSortFilter = (sortOrder: SortOrder) => {
    dispatch({ type: SET_SORT_FILTER, payload: sortOrder });
  };

  let data = {
    ...state,
    getFarmersGroupData,
    addFarmersGroup,
    editFarmersGroup,
    deleteFarmersGroup,
    addGroupMember,
    removeGroupMember,
    setSearchFilter,
    setSortFilter,
    setMemberFilter,
  };

  return <farmersGroupContext.Provider value={data}>{props.children}</farmersGroupContext.Provider>;
};

const useFarmersGroupContext = () => useContext(farmersGroupContext);

export { FarmersGroupContextProvider, useFarmersGroupContext };
