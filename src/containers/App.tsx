import { Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Layout from "./layout/Layout";
import Provider from "./provider";
import Login from "../views/login";
import ModalLaunchButtons from "../components/modals/ModalLaunchButtons";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Layout />} />
        </Routes>
        {/* <ModalLaunchButtons /> */}
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
