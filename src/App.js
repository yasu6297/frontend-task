// Updated App.js for routing
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
