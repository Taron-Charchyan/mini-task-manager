import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/Api";
import Loader from "../components/Loader";

export const PrivateRoute = ({ children }) => {
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        api.get("/auth/me")
            .then(() => setStatus("ok"))
            .catch(() => setStatus("fail"));
    }, []);

    if (status === "loading") return <Loader />;
    if (status === "fail") return <Navigate to="/login" replace />;
    return children;
};

export const PublicRoute = ({ children }) => {
    const isAuth = !!localStorage.getItem('token');
    return isAuth ? <Navigate to="/" replace /> : children;
};