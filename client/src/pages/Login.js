import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from '../assets/css/Auth.module.css';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/thunks/authThunks";
import Loader from "../components/Loader";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Email or password is not valid!");
            return;
        }

        const result = await dispatch(login(formData));
        if (result.type === "LOGIN_SUCCESS") {
            navigate("/", { replace: true });
        }
    };

    if (loading) return <Loader />;

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <h2>Welcome Back</h2>
                    <p className={styles.subtitle}>Please enter your details</p>

                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.authSubmitBtn}>Sign In</button>

                    <p className={styles.authFooter}>
                        Don't have an account? <Link replace to="/register">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;