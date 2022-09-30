import { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/profile.png";
import { searchWord } from "../constants";

//ACTION TYPES
const ADD_MD_DETAIL = "ADD_MD_DETAIL";
const EDIT_MD_DETAIL = "EDIT_MD_DETAIL";
const DELETE_MD_DETAIL = "DELETE_MD_DETAIL";
const FILTER_MD_DETAIL = "FILTER_MD_DETAIL";
const EDIT_TABLE_ICON = "EDIT_TABLE_ICON";

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
  searchFilter: string;
  addMdDetail: (data: mdDetail) => void;
  editMdDetail: (data: mdDetail) => void;
  deleteMdDetail: (id: string) => void;
  filterMdDetail: (name: string) => void;
  editTableIcon: (data: any) => void;
}

const initialState: mdDetailsContextType = {
  mdList: [
    {
      id: "1",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "2",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "3",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "4",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "5",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
    {
      id: "6",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      qualification: "BSc, Computer Science",
      dob: "2022-01-01",
      signature: "",
    },
  ],
  searchFilter: "",
  addMdDetail: () => {},
  editMdDetail: () => {},
  deleteMdDetail: () => {},
  editTableIcon: () => {},
  filterMdDetail: () => {},
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
    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const mdDetailsContext = createContext<mdDetailsContextType>(initialState);

const MdDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  state.addMdDetail = (data: mdDetail) => {
    dispatch({ type: ADD_MD_DETAIL, payload: data });
  };
  state.editMdDetail = (data: mdDetail) => {
    dispatch({ type: EDIT_MD_DETAIL, payload: data });
  };
  state.deleteMdDetail = (id: string) => {
    dispatch({ type: DELETE_MD_DETAIL, payload: id });
  };
  const filterMdDetail = (name: string) => {
    dispatch({ type: FILTER_MD_DETAIL, payload: name });
  };
  const editTableIcon = (data: mdDetail) => {
    dispatch({ type: EDIT_TABLE_ICON, payload: data });
  };

  let data = {
    ...state,
    filterMdDetail,
    editTableIcon,
  };

  return <mdDetailsContext.Provider value={data}>{props.children}</mdDetailsContext.Provider>;
};

const useMdDetailsContext = () => useContext(mdDetailsContext);

export { MdDetailsContextProvider, useMdDetailsContext };
