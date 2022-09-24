import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Provider from "./provider";
import Login from "../views/login";

import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import ModalLaunchButtons from "../components/modals/ModalLaunchButtons";

const App: FC = () => {
  return (
    <>
      <Provider>
        {/* <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Layout />} />
        </Routes> */}
        <ModalLaunchButtons/>
      </Provider>
    </>
  );
};

export default App;
