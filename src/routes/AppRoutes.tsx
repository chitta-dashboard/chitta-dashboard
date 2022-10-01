import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../views/dashboard";
import CEODetails from "../views/ceo-details";
import MDDetails from "../views/md-details";
import FarmersGroup from "../views/farmers-group";
import FarmersDetails from "../views/farmers-details";
import Cultivation from "../views/cultivation";
import Register from "../views/register";
import Decisions from "../views/decisions";
import NotFound from "../views/not-found";
import FarmerDetailPage from "../views/farmer-detail-page";

const AppRouters: FC = () => {
  return (
    <Routes>
      <Route path={`/`} element={<Navigate to={"/login"} />} />
      <Route path={`/dashboard`} element={<Dashboard />} />
      <Route path={`/ceo-details`} element={<CEODetails />} />
      <Route path={`/md-details`} element={<MDDetails />} />
      <Route path={`/farmers-group`} element={<FarmersGroup />} />
      <Route path={`/farmers-details`} element={<FarmersDetails />} />
      <Route path={`/farmers-details/:id`} element={<FarmerDetailPage />} />
      <Route path={`/cultivation`} element={<Cultivation />} />
      <Route path={`/register`} element={<Register />} />
      <Route path={`/decisions`} element={<Decisions />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouters;
