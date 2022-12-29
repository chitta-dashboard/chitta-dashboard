import React, { createContext, FC, useContext, useReducer } from "react";

//ACTION TYPES
const ADD_CEO_DETAIL = "ADD_CEO_DETAIL";
const EDIT_CEO_DETAIL = "EDIT_CEO_DETAIL";
const DELETE_CEO_DETAIL = "DELETE_CEO_DETAIL";

export type ceoDetail = {
  id: string;
  name: string;
  profile: string;
  dob: string;
  phoneNumber: string;
  qualification: string;
  description: string;
  joinedDate?: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface CeoDetailsContextType {
  ceoDetailsById: { [id: string]: ceoDetail };
  addCeoDetail: (data: ceoDetail) => void;
  editCeoDetail: (data: ceoDetail) => void;
  deleteCeoDetail: (id: string) => void;
}

const initialState: CeoDetailsContextType = {
  ceoDetailsById: {},
  addCeoDetail: () => {},
  editCeoDetail: () => {},
  deleteCeoDetail: () => {},
};

const reducer = (state: CeoDetailsContextType, action: any) => {
  switch (action.type) {
    case ADD_CEO_DETAIL:
      return { ...state, ceoDetailsById: { ...state.ceoDetailsById, [action.payload.id]: action.payload } };

    case EDIT_CEO_DETAIL:
      return { ...state, ceoDetailsById: { ...state.ceoDetailsById, [action.payload.id]: action.payload } };

    case DELETE_CEO_DETAIL:
      delete state.ceoDetailsById[action.payload];
      return { ...state, ceoDetailsById: { ...state.ceoDetailsById } };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const ceoDetailsContext = createContext<CeoDetailsContextType>(initialState);

const CeoDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addCeoDetail = (data: ceoDetail) => {
    dispatch({ type: ADD_CEO_DETAIL, payload: data });
  };

  const editCeoDetail = (data: ceoDetail) => {
    dispatch({ type: EDIT_CEO_DETAIL, payload: data });
  };

  const deleteCeoDetail = (id: string) => {
    dispatch({ type: DELETE_CEO_DETAIL, payload: id });
  };

  let data = {
    ...state,
    addCeoDetail,
    editCeoDetail,
    deleteCeoDetail,
  };

  return <ceoDetailsContext.Provider value={data}>{props.children}</ceoDetailsContext.Provider>;
};

const useCeoDetailsContext = () => useContext(ceoDetailsContext);

export { CeoDetailsContextProvider, useCeoDetailsContext };
