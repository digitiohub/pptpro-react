import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";

import "./index.css";

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
