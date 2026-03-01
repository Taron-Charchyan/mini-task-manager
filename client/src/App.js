import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Header from "./components/Header";
import ErrorPage from "./pages/ErrorPage";
import { PrivateRoute, PublicRoute } from "./helpers/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Wrapper from "./components/Wrapper";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

                <Route path="/" element={
                    <PrivateRoute>
                        <Wrapper><Home /></Wrapper>
                    </PrivateRoute>
                } />
                <Route path="/users" element={
                    <PrivateRoute>
                        <Wrapper><Users /></Wrapper>
                    </PrivateRoute>
                } />

                <Route path="*" element={<ErrorPage />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                draggable
                pauseOnHover
            />
        </BrowserRouter>
    );
}

export default App;