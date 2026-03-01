import React, { useState } from 'react';
import styles from '../assets/css/ViewTask.module.css';
import { FaEye } from "react-icons/fa";
import EmptyState from "./EmptyState";

function ViewTask({ task }) {
    const [openViewTask, setOpenViewTask] = useState(false);

    if (!task) return <EmptyState message={"Task not found"}/>;

    return (
        <>
            <FaEye
                className={styles.viewIcon}
                onClick={() => setOpenViewTask(true)}
            />

            {openViewTask && (
                <div className={styles.modalOverlay} onClick={() => setOpenViewTask(false)}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className={styles.modalTitle}>Task details</h2>

                        <div className={styles.modalRow}>
                            <span className={styles.modalLabel}>Title</span>
                            <span className={styles.modalValue}>{task.title}</span>
                        </div>

                        <div className={styles.modalRow}>
                            <span className={styles.modalLabel}>About task</span>
                            <span className={styles.modalValue}>
                                {task.description || '—'}
                            </span>
                        </div>

                        <div className={styles.modalRow}>
                            <span className={styles.modalLabel}>Task status</span>
                            <span
                                className={`${styles.taskStatus} ${
                                    task.status === 'done' ? styles.done : styles.pending
                                }`}
                            >
                                {task.status === 'done' ? 'Done' : 'Pending'}
                            </span>
                        </div>

                        <button
                            className={styles.modalOkBtn}
                            onClick={() => setOpenViewTask(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ViewTask;