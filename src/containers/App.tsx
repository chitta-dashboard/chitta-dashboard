import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Provider from "./provider";
import Login from "../views/login";

const App = () => {
  return (
    <Provider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Layout />} />
      </Routes>
      {/* <ModalLaunchButtons/> */}
    </Provider>
  );
};

export default App;
