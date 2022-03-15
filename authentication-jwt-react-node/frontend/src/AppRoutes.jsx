import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/" element={<MainPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;