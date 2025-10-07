import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Layout>
                  <Chat />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default AppRoutes;
