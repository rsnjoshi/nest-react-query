import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "../login/login.component";
import RegisterComponent from "../register/register.component";
import DashboardComponent from "../dashboard/dashboard.component";
import NotFoundComponent from "./notFoundComponent";

function AppRouter() {
  return (
    <React.Fragment>
      <Routes>
        <Route key="router-login" path="/login" element={<LoginComponent />} />
        <Route
          key="router-registration"
          path="/register"
          element={<RegisterComponent />}
        />
        <Route
          key="router-dashboard"
          path="/dashboard"
          element={<DashboardComponent />}
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </React.Fragment>
  );
}

export default AppRouter;
