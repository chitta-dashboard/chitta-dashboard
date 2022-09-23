import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/notFound/NotFound";
import Dashboard from "../views/dashboard";

const AppRouters: FC = () => {
  return (
    <Routes>
      <Route path={`/`} element={<Dashboard />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouters;
