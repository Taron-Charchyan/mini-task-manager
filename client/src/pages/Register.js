import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/css/Auth.module.css';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/thunks/authThunks";
import Loader from "../components/Loader";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.warn("Passwords do not match");
        }

        const result = await dispatch(register(formData));
        if (result.type === "REGISTER_SUCCESS") {
            navigate("/", { replace: true });
        }
    };

    if (loading) return <Loader />;

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <h2>Create Account</h2>
                    <p className={styles.subtitle}>Join our community today</p>

                    <div className={styles.inputGroup}>
                        <input name="name" placeholder="Full Name" type="text" onChange={handleChange} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <input name="email" placeholder="Email Address" type="email" onChange={handleChange} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <input name="confirmPassword" placeholder="Confirm Password" type="password" onChange={handleChange} required />
                    </div>

                    <button type="submit" className={styles.authSubmitBtn}>Register</button>

                    <p className={styles.authFooter}>
                        Already have an account? <Link replace to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;