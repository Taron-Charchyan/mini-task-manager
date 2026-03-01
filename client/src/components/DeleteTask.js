import React, { useState } from 'react';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import styles from '../assets/css/DeleteTask.module.css';
import { deleteTask } from "../store/thunks/taskThunks";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function DeleteTask({ task, onTaskDeleted }) {
    const [isConfirming, setIsConfirming] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id))
            .then(() => {
                setIsConfirming(false);
                if (onTaskDeleted) onTaskDeleted();
                toast.success("Task deleted");
            })
            .catch(() => {
                toast.error("Error deleting task");
            });
    };

    return (
        <div className={styles.deleteWrapper}>
            {!isConfirming ? (
                <button
                    className={styles.deleteBtnInitial}
                    onClick={() => setIsConfirming(true)}
                >
                    <FaTrash />
                </button>
            ) : (
                <div className={styles.deleteConfirmGroup}>
                    <button
                        className={styles.deleteBtnYes}
                        onClick={() => handleDeleteTask(task._id)}
                    >
                        <FaCheck />
                    </button>
                    <button
                        className={styles.deleteBtnNo}
                        onClick={() => setIsConfirming(false)}
                    >
                        <FaTimes />
                    </button>
                </div>
            )}
        </div>
    );
}

export default DeleteTask;