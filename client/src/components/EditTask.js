import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import styles from '../assets/css/EditTask.module.css';
import { useDispatch } from "react-redux";
import { editTask } from "../store/thunks/taskThunks";
import { toast } from "react-toastify";

function EditTask({ task, onTaskUpdated }) {
    const dispatch = useDispatch();
    const [openEditTask, setOpenEditTask] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: task.title,
        description: task.description,
        status: task.status
    });
    const [loading, setLoading] = useState(false);

    const handleEditTask = async (id) => {
        setLoading(true);
        try {
            await dispatch(editTask(id, editedTask));
            setOpenEditTask(false);
            if (onTaskUpdated) onTaskUpdated();
            toast.success("Task updated successfully");
        } catch (err) {
            toast.error("Error updating task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.editTaskContainer}>
            <FaEdit className={styles.editIcon} onClick={() => setOpenEditTask(true)} />

            {openEditTask && (
                <div className={styles.editTaskOverlay}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEditTask(task._id);
                        }}
                        onReset={() => setOpenEditTask(false)}
                    >
                        <h3>Edit Task</h3>

                        <input
                            className={styles.editTaskInput}
                            type="text"
                            placeholder="Task Title"
                            value={editedTask.title}
                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                            required
                        />

                        <input
                            className={styles.editTaskInput}
                            type="text"
                            placeholder="Description"
                            value={editedTask.description}
                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            required
                        />

                        <label className={styles.checkboxGroup}>
                            <input
                                type="checkbox"
                                checked={editedTask.status === "done"}
                                onChange={(e) =>
                                    setEditedTask({ ...editedTask, status: e.target.checked ? "done" : "pending" })
                                }
                            />
                            Mark as Done
                        </label>

                        <div className={styles.btnGroup}>
                            <button type="submit" className={styles.btnSave} disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                            <button type="reset" className={styles.btnCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EditTask;