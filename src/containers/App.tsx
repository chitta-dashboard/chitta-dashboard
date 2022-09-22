import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Provider from "./provider";
import Login from "../views/login";
// @ts-ignore
// eslint-disable-next-line
import types from "../types";
import ModalLaunchButtons from "../components/modals/ModalLaunchButtons";

const App: FC = () => {
  return (
    <>
      {/* <ModalLaunchButtons/> */}
      <Provider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Layout />} />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
