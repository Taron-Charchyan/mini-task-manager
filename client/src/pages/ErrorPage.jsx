import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/css/ErrorPage.module.css';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.code}>404</h1>
                <h2 className={styles.title}>Page not found</h2>
                <p className={styles.text}>
                    Oops! Looks like you've come to the wrong place. Return to the main page to continue.
                </p>
                <button className={styles.button} onClick={() => navigate('/')}>
                    Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;