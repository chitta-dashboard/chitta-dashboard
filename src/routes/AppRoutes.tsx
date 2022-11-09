import { FC, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/loader";
import { RouterDefaults } from "../utils/constants";

const AppRouters: FC = () => {
  return (
    <Routes>
      <Route path={`/`} element={<Navigate to={"/login"} />} />
      {RouterDefaults.map((item, i) => (
        <Route
          key={i}
          path={item.path}
          element={
            <Suspense
              fallback={
                <div style={{ width: "100%", height: "100%" }}>
                  <Loader />
                </div>
              }
            >
              <item.component />
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default AppRouters;
