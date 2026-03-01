import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import styles from '../assets/css/Wrapper.module.css';

function Wrapper({ children }) {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Wrapper;