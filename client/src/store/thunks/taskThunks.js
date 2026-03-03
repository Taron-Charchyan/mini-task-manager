import api from "../../api/Api";
import { toast } from "react-toastify";
import {
    FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_ERROR,
    EDIT_TASKS_REQUEST, EDIT_TASKS_SUCCESS, EDIT_TASKS_ERROR,
    DELETE_TASKS_REQUEST, DELETE_TASKS_SUCCESS, DELETE_TASKS_ERROR,
    RELATED_TASKS_REQUEST, RELATED_TASKS_SUCCESS, RELATED_TASKS_ERROR
} from "../types";

export const fetchTasks = (page, limit) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_TASKS_REQUEST });
        try {
            const { data } = await api.get(`/tasks?page=${page}&limit=${limit}`);
            dispatch({ type: FETCH_TASKS_SUCCESS, payload: data });
        } catch (err) {
            dispatch({
                type: FETCH_TASKS_ERROR,
                payload: err.response?.data?.message || err.message
            });
            toast.error("Error loading tasks.");
        }
    };
};

export const editTask = (id, editedTask) => {
    return async (dispatch) => {
        dispatch({ type: EDIT_TASKS_REQUEST });
        try {
            const { data } = await api.put(`/tasks/${id}`, editedTask);

            dispatch({
                type: EDIT_TASKS_SUCCESS,
                payload: data
            });

            toast.success("Task edited successfully.");
        } catch (err) {
            dispatch({
                type: EDIT_TASKS_ERROR,
                payload: err.response?.data?.message || err.message
            });
            toast.error("Error while editing task.");
        }
    };
};

export const deleteTask = (id) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_TASKS_REQUEST });
        try {
            await api.delete(`/tasks/${id}`);
            dispatch({ type: DELETE_TASKS_SUCCESS });
        } catch (err) {
            dispatch({ type: DELETE_TASKS_ERROR, payload: err.response?.data?.message || err.message });
        }
    };
};

export const relatedTasks = (page, limit, type) => {
    return async (dispatch) => {
        dispatch({ type: RELATED_TASKS_REQUEST });
        try {
            const { data } = await api.get(
                `/tasks/related-tasks?page=${page}&limit=${limit}&type=${type}`
            );

            dispatch({
                type: RELATED_TASKS_SUCCESS,
                payload: data
            });
        } catch (err) {
            dispatch({
                type: RELATED_TASKS_ERROR,
                payload: err.response?.data?.message || err.message
            });

            toast.error("Error loading related tasks.");
        }
    };
};