import { toast } from "react-toastify";
import api from "../../api/Api";
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR,
    LOGOUT
} from "../types";

export const login = (formData) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const { data } = await api.post("/auth/login", {
                email: formData.email.trim().toLowerCase(),
                password: formData.password
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: LOGIN_SUCCESS, payload: data.user });
            toast.success("Login successfully!");
            return { type: LOGIN_SUCCESS };
        } catch (err) {
            dispatch({ type: LOGIN_ERROR, payload: err.response?.data?.message || "Login failed" });
            toast.error(err.response?.data?.message || "Login failed");
            return { type: LOGIN_ERROR };
        }
    };
};

export const register = (formData) => {
    return async dispatch => {
        dispatch({ type: REGISTER_REQUEST });
        try {
            const { data } = await api.post("/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            dispatch({ type: REGISTER_SUCCESS, payload: data.user });
            toast.success("Registered successfully!");
            return { type: REGISTER_SUCCESS };
        } catch (err) {
            dispatch({ type: REGISTER_ERROR, payload: err.response?.data?.message || err.message });
            toast.warn(err.response?.data?.message || 'Registration failed');
            return { type: REGISTER_ERROR };
        }
    };
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
};