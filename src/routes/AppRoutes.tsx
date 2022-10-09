import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../views/dashboard";
import CEODetails from "../views/ceo-details";
import MDDetails from "../views/md-details";
import FarmersGroup from "../views/farmers-group";
import FarmersDetails from "../views/farmers-details";
import Founders from "../views/founders";
import AdminPanel from "../views/admin-panel";
import Decisions from "../views/decisions";
import NotFound from "../views/not-found";
import FarmerDetailPage from "../views/farmer-detail-page";
import DecisionCertificate from "../views/decision-certificate";

const AppRouters: FC = () => {
  return (
    <Routes>
      <Route path={`/`} element={<Navigate to={"/login"} />} />
      <Route path={`/dashboard`} element={<Dashboard />} />
      <Route path={`/ceo-details`} element={<CEODetails />} />
      <Route path={`/md-details`} element={<MDDetails />} />
      <Route path={`/farmers-group`} element={<FarmersGroup />} />
      <Route path={`/farmers-details`} element={<FarmersDetails />} />
      <Route path={`/farmers-details/:farmerId`} element={<FarmerDetailPage />} />
      <Route path={`/founders`} element={<Founders />} />
      <Route path={`/admin-panel`} element={<AdminPanel />} />
      <Route path={`/board-resolution`} element={<Decisions />} />
      <Route path={`/board-resolution/:resolutionId`} element={<DecisionCertificate />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouters;
