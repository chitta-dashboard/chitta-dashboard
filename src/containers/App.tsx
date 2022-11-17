import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Provider from "./provider";
import Login from "../views/login";
import { ToastContainer } from "../utils/toast";
import ModalLaunchButtons from "../components/modals/ModalLaunchButtons";

const App = () => {
  return (
    <Provider>
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Layout />} />
      </Routes>
      <ToastContainer newestOnTop hideProgressBar={true} pauseOnFocusLoss={false} /> */}
      <ModalLaunchButtons />
    </Provider>
  );
};

export default App;
