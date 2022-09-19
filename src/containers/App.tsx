import React, { FC } from "react";
import Layout from "./layout/Layout";
import Provider from "./provider";
import { Routes, Route } from "react-router-dom";
import Login from "../views/login";
// @ts-ignore
// eslint-disable-next-line
import types from "../types";

const App: FC = () => {
  return (
    <>
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
