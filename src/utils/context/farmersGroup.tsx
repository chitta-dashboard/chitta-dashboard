import React, { createContext, FC, useContext, useReducer } from "react";

//ACTION TYPES
const ADD_FARMER_GROUP_DETAIL = "ADD_FARMER_GROUP_DETAIL";
const EDIT_FARMER_GROUP_DETAIL = "EDIT_FARMER_GROUP_DETAIL";
const DELETE_FARMER_GROUP_DETAIL = "DELETE_FARMER_GROUP_DETAIL";
const SET_PAGE = "SET_PAGE";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";

export type farmerGroupDetail = {
  id: string;
  groupName: string;
  explanation: string;
  chairman: string;
  treasurer: string;
  secretary: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerGroupDetailsContextType {
  farmerGroupList: farmerGroupDetail[];
  page: number;
  rowsPerPage: number;
  searchFilter: string;
  sortFilter: "ascending" | "descending";
  setSortFilter: (sortOrder: "ascending" | "descending") => void;
  setSearchFilter: (searchText: string) => void;
  addFarmerGroupDetail: (data: farmerGroupDetail) => void;
  editFarmerGroupDetail: (data: farmerGroupDetail) => void;
  deleteFarmerGroupDetail: (id: string) => void;
  setPage: (page: number) => void;
}

const initialState: farmerGroupDetailsContextType = {
  farmerGroupList: [
    {
      id: "1",
      groupName: "விவசாயிகள் சங்கம்-1",
      explanation: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      secretary: "vanthiyadevan",
    },
    {
      id: "2",
      groupName: "விவசாயிகள் சங்கம்-2",
      explanation: "இந்த குழு சோழர் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      secretary: "vanthiyadevan",
    },
    {
      id: "3",
      groupName: "விவசாயிகள் சங்கம்-3",
      explanation: "இந்த குழு பாண்டியன் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      secretary: "vanthiyadevan",
    },
  ],

  page: 1,
  rowsPerPage: 6,
  searchFilter: "",
  sortFilter: "ascending",
  setSortFilter: () => {},
  setSearchFilter: () => {},
  addFarmerGroupDetail: () => {},
  editFarmerGroupDetail: () => {},
  deleteFarmerGroupDetail: () => {},
  setPage: () => {},
};

const reducer = (state: farmerGroupDetailsContextType, action: any) => {
  switch (action.type) {
    case ADD_FARMER_GROUP_DETAIL:
      return { ...state, farmerGroupList: [...state.farmerGroupList, action.payload] };

    case EDIT_FARMER_GROUP_DETAIL:
      const updatedfarmerGroupList = action.payload;
      const editfarmerGroupList = state.farmerGroupList.map((list) => {
        if (list.id === updatedfarmerGroupList.id) {
          return updatedfarmerGroupList;
        }
        return list;
      });
      return {
        ...state,
        farmerGroupList: editfarmerGroupList,
      };

    case DELETE_FARMER_GROUP_DETAIL:
      return { ...state, farmerGroupList: state.farmerGroupList.filter((list) => list.id !== action.payload) };
    case SET_PAGE:
      return { ...state, page: action.payload };

    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const farmerGroupDetailsContext = createContext<farmerGroupDetailsContextType>(initialState);

const FarmerGroupDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFarmerGroupDetail = (data: farmerGroupDetail) => {
    dispatch({ type: ADD_FARMER_GROUP_DETAIL, payload: data });
  };
  const editFarmerGroupDetail = (data: farmerGroupDetail) => {
    dispatch({ type: EDIT_FARMER_GROUP_DETAIL, payload: data });
  };
  const deleteFarmerGroupDetail = (id: string) => {
    dispatch({ type: DELETE_FARMER_GROUP_DETAIL, payload: id });
  };
  const setPage = (page: number) => {
    dispatch({ type: SET_PAGE, payload: page });
  };
  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };
  const setSortFilter = (sortOrder: "ascending" | "descending") => {
    dispatch({ type: SET_SORT_FILTER, payload: sortOrder });
  };

  let data = {
    ...state,
    addFarmerGroupDetail,
    editFarmerGroupDetail,
    deleteFarmerGroupDetail,
    setSearchFilter,
    setSortFilter,
    setPage,
  };

  return <farmerGroupDetailsContext.Provider value={data}>{props.children}</farmerGroupDetailsContext.Provider>;
};

const useFarmerGroupDetailsContext = () => useContext(farmerGroupDetailsContext);

export { FarmerGroupDetailsContextProvider, useFarmerGroupDetailsContext };
