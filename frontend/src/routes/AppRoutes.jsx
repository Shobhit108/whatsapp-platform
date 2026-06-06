import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Conversations from "../pages/Conversations";
import Contacts from "../pages/Contacts";
import Settings from "../pages/Settings";

import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/conversations"
            element={<Conversations />}
          />
          <Route
            path="/contacts"
            element={<Contacts />}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;