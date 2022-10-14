import React, { createContext, FC, useContext, useReducer } from "react";
import { NORMAL, SortOrder } from "../constants";

//ACTION TYPES
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

interface GroupMembers {
  id: string;
  group: string;
}

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmersGroupContextType {
  farmersGroupById: { [id: string]: FarmersGroup };
  searchFilter: string;
  memberFilter: number;
  sortFilter: SortOrder;
  setSortFilter: (sortOrder: SortOrder) => void;
  setSearchFilter: (searchText: string) => void;
  addFarmersGroup: (data: FarmersGroup) => void;
  editFarmersGroup: (data: FarmersGroup) => void;
  deleteFarmersGroup: (id: string) => void;
  addGroupMember: (data: GroupMembers) => void;
  removeGroupMember: (data: GroupMembers) => void;
  setMemberFilter: (value: number) => void;
}

const initialState: farmersGroupContextType = {
  farmersGroupById: {
    "1": {
      id: "1",
      groupName: "விவசாயிகள் சங்கம்-1",
      explanation: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "option-1",
      treasurer: "option-3",
      secretary: "option-2",
      members: ["1", "4", "5"],
    },
    "2": {
      id: "2",
      groupName: "விவசாயிகள் சங்கம்-2",
      explanation: "இந்த குழு சோழர் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "option-2",
      treasurer: "option-3",
      secretary: "option-2",
      members: [],
    },
    "3": {
      id: "3",
      groupName: "விவசாயிகள் சங்கம்-3",
      explanation: "இந்த குழு பாண்டியன் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "option-3",
      treasurer: "option-3",
      secretary: "option-3",
      members: ["2", "3", "6"],
    },
  },
  searchFilter: "",
  addGroupMembers: () => {},
  sortFilter: NORMAL,
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
      return { ...state, farmersGroupById: { ...state.farmersGroupById, [action.payload.id]: action.payload } };

    case EDIT_FARMERS_GROUP:
      return { ...state, farmersGroupById: { ...state.farmersGroupById, [action.payload.id]: action.payload } };

    case DELETE_FARMERS_GROUP:
      delete state.farmersGroupById[action.payload];
      return { ...state, farmersGroupById: { ...state.farmersGroupById } };

    case ADD_GROUP_MEMBER:
      // let removeIndex: any = {
      //   id: "",
      //   mem: [],
      // };
      // const removeMember = Object.values(state.farmersGroupById).map((list) => list.members);
      // removeMember.map((person, i) => {
      //   person.filter((list) => {
      //     if (list.includes(action.payload.id)) {
      //       removeIndex["id"] = list;
      //       removeIndex["mem"] = person.filter((per) => per !== action.payload.id);
      //     }
      //   });
      // });
      // console.log("removeIndex", removeIndex);
      // // console.log("Test Id : ", testId);
      // // console.log("revMember", state.farmersGroupById[removeIndex["id"]]);
      // if (removeIndex.id !== "") {
      //   return {
      //     ...state,
      //     farmersGroupById: {
      //       ...(state.farmersGroupById[removeIndex["id"]].members = removeIndex["mem"]),
      //     },
      //   };
      // }
      console.log(action.payload, action.payload);
      const addMember = Object.values(state.farmersGroupById).filter((list) => list.groupName === action.payload.group);
      console.log("addMember", addMember);
      let data = !addMember[0].members.includes(action.payload.id) ? [...addMember[0].members, action.payload.id] : [...addMember[0].members];
      addMember[0].members = data;
      return { ...state };

    case REMOVE_GROUP_MEMBER:
      let removeMember = action.payload.id; //user id from the
      console.log(typeof action.payload.id, "action.payload.id");
      // let farmersGroup = Object.values(state.farmersGroupById)
      // let removeMember = "1"; //user id from the
      // console.log("before", farmersGroupById);
      let removeMemberIndex = Object.values(state.farmersGroupById)
        .map((farmersGroup) => farmersGroup.members)
        .findIndex((arr) => arr.includes(removeMember));
      console.log("removeMemberIndex", removeMemberIndex);
      if (removeMemberIndex !== -1) {
        const updatedMember = Object.values(state.farmersGroupById)[removeMemberIndex].members.filter((member) => member !== removeMember);
        console.log("updatedMember", updatedMember);
        console.log("if", removeMemberIndex);
        // console.log("final farmerlist", (Object.values(state.farmersGroupById)[removeMemberIndex].members = updatedMember));
        return {
          ...state,
          farmersGroupById: {
            ...(Object.values(state.farmersGroupById)[removeMemberIndex].members = updatedMember),
          },
        };
      }
      // let out2 = Object.values(farmersGroupById)[out].members.filter((id) => id !== newMember);
      //
      // Object.values(farmersGroupById)[out].members = out2;

      // -------------------------------------------------------- OLD ----------------------------
      // console.log("test",test)
      // let removeIndex: any = {
      //   id: "",
      //   mem: [],
      // };
      // const removeMember = Object.values(state.farmersGroupById).map((list) => list.members);
      // removeMember.map((person) => {
      //   person.filter((list) => {
      //     if (list.includes(action.payload.id)) {
      //       removeIndex["id"] = list;
      //       removeIndex["mem"] = person.filter((per) => per !== action.payload.id);
      //     }
      //   });
      // });
      // console.log("removeIndex", removeIndex);
      // // console.log("Test Id : ", testId);
      // console.log("revMember", removeIndex["id"] && state.farmersGroupById.removeIndex.id);
      // if (removeIndex.id !== "") {
      //   return {
      //     ...state,
      //     farmersGroupById: {
      //       ...(state.farmersGroupById[removeIndex["id"]].members = removeIndex["mem"]),
      //     },
      //   };
      // }
      console.log("state");
      return { ...state };

    case MEMBER_FILTER:
      return { ...state, memberFilter: action.payload };

    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const farmersGroupContext = createContext<farmersGroupContextType>(initialState);

const FarmersGroupContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer<(reducer: any, initialState: any) => any>(reducer, initialState);

  const addFarmersGroup = (data: FarmersGroup) => {
    dispatch({ type: ADD_FARMERS_GROUP, payload: data });
  };

  const editFarmersGroup = (data: FarmersGroup) => {
    dispatch({ type: EDIT_FARMERS_GROUP, payload: data });
  };

  const deleteFarmersGroup = (id: string) => {
    dispatch({ type: DELETE_FARMERS_GROUP, payload: id });
  };

  const addGroupMember = (data: GroupMembers) => {
    dispatch({ type: ADD_GROUP_MEMBER, payload: data });
  };
  const removeGroupMember = (data: GroupMembers) => {
    dispatch({ type: REMOVE_GROUP_MEMBER, payload: data });
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
