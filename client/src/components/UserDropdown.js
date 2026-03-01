import React from 'react';
import styles from '../assets/css/UserDropdown.module.css';
import api from "../api/Api";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/thunks/authThunks";

function UserDropdown({ userInfo, closeDropdown }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (e) {
            console.error("Logout error:", e.response?.data?.message || e.message);
        } finally {
            dispatch(logoutAction());
            closeDropdown();
            navigate('/login', { replace: true });
        }
    };

    return (
        <div className={styles.userDropdown} onClick={closeDropdown}>
            <div className={styles.userDropdownInfo}>
                <p className={styles.userDropdownName}>{userInfo?.name}</p>
                <p className={styles.userDropdownEmail}>{userInfo?.email}</p>
            </div>

            <div className={styles.userDropdownActions}>
                <NavLink to="/login" className={styles.dropdownBtn}>Sign in</NavLink>
                <NavLink to="/register" className={styles.dropdownBtn}>Create a new account</NavLink>
                <button
                    className={`${styles.dropdownBtn} ${styles.dropdownBtnDanger}`}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default UserDropdown;