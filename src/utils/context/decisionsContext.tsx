import React, { createContext, useContext, useState } from "react";
import data from "../../components/decisions/decisions.json";
import { Dispatch, SetStateAction } from "react";

interface IGroup {
  groupName: string;
  groupTitle: string;
  groupDescription: string;
  timestamp: string;
}

interface IContext {
  groupData: IGroup[];
  setGroupData: Dispatch<SetStateAction<IGroup[]>>;
}

interface PropType {
  children: JSX.Element | JSX.Element[];
}

const decisionsContext = createContext({
  groupData: data,
  setGroupData: (() => {}) as Dispatch<SetStateAction<IGroup[]>>,
} as IContext);

const DecisionsProvider: React.FC<PropType> = ({ children }) => {
  const [groupData, setGroupData] = useState(data);
  return <decisionsContext.Provider value={{ groupData, setGroupData }}>{children}</decisionsContext.Provider>;
};

const useDecisionsProviderContext = () => useContext(decisionsContext);

export { DecisionsProvider, useDecisionsProviderContext };
