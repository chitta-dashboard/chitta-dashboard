import React, { createContext, useContext, useReducer } from "react";

//ACTION TYPES
const ADD_DECISION = "ADD_DECISION";

interface IDecision {
  groupName: string;
  groupTitle: string;
  groupDescription: string;
  timestamp: string;
}

interface IContextType {
  decisions: IDecision[];
  addDecision: (decision: IDecision) => void;
}

interface PropType {
  children: JSX.Element | JSX.Element[];
}

const initialState: IContextType = {
  decisions: [
    {
      groupName: "Group - 1",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
      timestamp: "Mar 16,2022, 10:30 AM",
    },
    {
      groupName: "Group - 2",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent",
      timestamp: "Mar 16,2022, 10:30 AM",
    },
    {
      groupName: "Group - 3",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet ingilla urna porttitor rhoncus dolor purus non enim praesent",
      timestamp: "Mar 16,2022, 10:30 AM",
    },
    {
      groupName: "Group - 4",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
      timestamp: "Mar 16,2022, 10:30 AM",
    },
    {
      groupName: "Group - 5",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
      timestamp: "Mar 16,2022, 10:30 AM",
    },
    {
      groupName: "Group - 6",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent",
      timestamp: "Mar 16,2022, 10:30 AM",
    },
    {
      groupName: "Group - 7",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
      timestamp: "Mar 16,2022, 10:30 AM",
    },
    {
      groupName: "Group - 8",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent",
      timestamp: "Mar 16,2022, 10:30 AM",
    },
  ],
  addDecision: () => {},
};

const decisionsContext = createContext<IContextType>(initialState);

const reducer = (state: IContextType, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ADD_DECISION:
      // adds new decision to front of the array
      return { ...state, decisions: [action.payload, ...state.decisions] };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

const DecisionsProvider: React.FC<PropType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addDecision = (decision: IDecision) => {
    dispatch({ type: ADD_DECISION, payload: decision });
  };

  const data = {
    ...state,
    addDecision,
  };

  return <decisionsContext.Provider value={data}>{children}</decisionsContext.Provider>;
};

const useDecisionsProviderContext = () => useContext(decisionsContext);

export { DecisionsProvider, useDecisionsProviderContext };
