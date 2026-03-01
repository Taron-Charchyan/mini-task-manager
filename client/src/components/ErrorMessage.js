import React from 'react';
import styles from "../assets/css/ErrorMessage.module.css";

function ErrorMessage({ message, onRetry }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                <h3 className={styles.title}>Error</h3>

                <p className={styles.message}>
                    {message || "Something went wrong. Please try again."}
                </p>

                <button
                    className={styles.button}
                    onClick={onRetry || (() => window.location.reload())}
                >
                    Try again
                </button>

            </div>
        </div>
    );
}

export default ErrorMessage;