import { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/profile.png";
import { searchWord } from "../constants";

//ACTION TYPES
const ADD_MD_DETAIL = "ADD_MD_DETAIL";
const EDIT_MD_DETAIL = "EDIT_MD_DETAIL";
const DELETE_MD_DETAIL = "DELETE_MD_DETAIL";
const FILTER_MD_DETAIL = "FILTER_MD_DETAIL";
const EDIT_TABLE_ICON = "EDIT_TABLE_ICON";
const SET_PAGE = "SET_PAGE";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";

export type mdDetail = {
  id: string;
  name: string;
  phoneNumber: string;
  qualification: string;
  profile?: string;
  dob: string;
  signature?: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export interface mdDetailsContextType {
  mdList: mdDetail[];
  page: number;
  rowsPerPage: number;
  searchFilter: string;
  setSearchFilter: (searchText: string) => void;
  addMdDetail: (data: mdDetail) => void;
  editMdDetail: (data: mdDetail) => void;
  deleteMdDetail: (id: string) => void;
  filterMdDetail: (name: string) => void;
  editTableIcon: (data: any) => void;
  setPage: (page: number) => void;
}

const initialState: mdDetailsContextType = {
  mdList: [
    {
      id: "1",
      profile: profileImg,
      name: "Arokiya1",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "2",
      profile: profileImg,
      name: "Arokiya2",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "3",
      profile: profileImg,
      name: "Arokiya3",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "4",
      profile: profileImg,
      name: "Arokiya4",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "5",
      profile: profileImg,
      name: "Arokiya5",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "6",
      profile: profileImg,
      name: "Arokiya6",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "7",
      profile: profileImg,
      name: "Arokiya7",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "8",
      profile: profileImg,
      name: "Arokiya8",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "9",
      profile: profileImg,
      name: "Arokiya9",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "10",
      profile: profileImg,
      name: "Arokiya10",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "11",
      profile: profileImg,
      name: "Arokiya11",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "12",
      profile: profileImg,
      name: "Arokiya12",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "13",
      profile: profileImg,
      name: "Arokiya13",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "14",
      profile: profileImg,
      name: "Arokiya14",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "15",
      profile: profileImg,
      name: "Arokiya15",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "16",
      profile: profileImg,
      name: "Arokiya16",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
  ],
  page: 1,
  rowsPerPage: 10,
  searchFilter: "",
  setSearchFilter: () => {},
  addMdDetail: () => {},
  editMdDetail: () => {},
  deleteMdDetail: () => {},
  editTableIcon: () => {},
  filterMdDetail: () => {},
  setPage: () => {},
};

const reducer = (state: mdDetailsContextType, action: any) => {
  switch (action.type) {
    case ADD_MD_DETAIL:
      return { ...state, mdList: [...state.mdList, action.payload] };

    case EDIT_MD_DETAIL:
      const updatedMdDetail = action.payload;
      const editMdDetails = state.mdList.map((list) => {
        if (list.id === updatedMdDetail.id) {
          return updatedMdDetail;
        }
        return list;
      });
      return {
        ...state,
        mdList: editMdDetails,
      };

    case DELETE_MD_DETAIL:
      return { ...state, mdList: state.mdList.filter((list) => list.id !== action.payload) };

    case FILTER_MD_DETAIL:
      return {
        ...state,
        mdList: initialState.mdList.filter((md) => {
          return searchWord(md.name as string, action.payload);
        }),
      };

    case EDIT_TABLE_ICON:
      let data = state.mdList.filter((item) => item.id !== action.payload.id);
      return { ...state, mdList: [...data, action.payload] };
    case SET_PAGE:
      return { ...state, page: action.payload };

    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const mdDetailsContext = createContext<mdDetailsContextType>(initialState);

const MdDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMdDetail = (data: mdDetail) => {
    dispatch({ type: ADD_MD_DETAIL, payload: data });
  };
  const editMdDetail = (data: mdDetail) => {
    dispatch({ type: EDIT_MD_DETAIL, payload: data });
  };
  const deleteMdDetail = (id: string) => {
    dispatch({ type: DELETE_MD_DETAIL, payload: id });
  };
  const filterMdDetail = (name: string) => {
    dispatch({ type: FILTER_MD_DETAIL, payload: name });
  };
  const editTableIcon = (data: mdDetail) => {
    dispatch({ type: EDIT_TABLE_ICON, payload: data });
  };
  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };
  const setPage = (page: number) => {
    dispatch({ type: SET_PAGE, payload: page });
  };

  let data = {
    ...state,
    addMdDetail,
    editMdDetail,
    deleteMdDetail,
    filterMdDetail,
    editTableIcon,
    setPage,
    setSearchFilter,
  };

  return <mdDetailsContext.Provider value={data}>{props.children}</mdDetailsContext.Provider>;
};

const useMdDetailsContext = () => useContext(mdDetailsContext);

export { MdDetailsContextProvider, useMdDetailsContext };
