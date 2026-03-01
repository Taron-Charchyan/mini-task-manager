import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import styles from "../assets/css/AddNewTask.module.css";
import api from "../api/Api";
import ErrorMessage from "./ErrorMessage";

function AddNewTask({ onTaskAdded }) {
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        assignedTo: ""
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setError(null);
            const { data } = await api.get("/users/allUsers");
            setUsers(data);
        } catch (err) {
            setError("Failed to load users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/tasks/add', newTask);
            setNewTask({ title: '', description: '', assignedTo: '' });
            setOpenModal(false);
            if (onTaskAdded) onTaskAdded();
            toast.success("New task added successfully.");
        } catch (err) {
            toast.error("Error adding task");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prev => ({ ...prev, [name]: value }));
    };

    if (error) return <ErrorMessage message={error} onRetry={fetchUsers} />;

    return (
        <div className={openModal ? styles.addTaskContainer : styles.addTaskContainerClosed}>
            {openModal ? (
                <>
                    <h2>Create Task</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input
                                name="title"
                                type="text"
                                placeholder="Title"
                                value={newTask.title}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="description"
                                type="text"
                                placeholder="Description"
                                value={newTask.description}
                                onChange={handleChange}
                                required
                            />
                            <select
                                name="assignedTo"
                                value={newTask.assignedTo}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Assignee</option>
                                {users.map(user => (
                                    <option key={user._id} value={user._id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" disabled={loading} className={styles.modalBtn}>
                                {loading ? "Adding..." : "Add Task"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpenModal(false)}
                                className={styles.modalBtn}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <button onClick={() => setOpenModal(true)} className={styles.modalBtn}>
                    + Add Task
                </button>
            )}
        </div>
    );
}

export default AddNewTask;