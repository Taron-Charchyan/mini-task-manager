import api from "../../api/Api";
import { USERS_REQUEST, USERS_SUCCESS, USERS_ERROR } from "../types";

export const usersFetch = () => {
    return async (dispatch) => {
        dispatch({ type: USERS_REQUEST });
        try {
            const { data } = await api.get("/users/loggedIn");
            dispatch({ type: USERS_SUCCESS, payload: data });
            return data;
        } catch (err) {
            dispatch({ type: USERS_ERROR, payload: err.response?.data?.message || err.message });
        }
    };
};