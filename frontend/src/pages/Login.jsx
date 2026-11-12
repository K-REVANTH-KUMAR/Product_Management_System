import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const data = await apiRequest("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password })
            });

            login(data.token, data.user);
            navigate("/");
        } catch (error) {
            setMessage(error.message);
        }

        setLoading(false);
    }

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1>Product Management</h1>
                <p className="muted">Sign in to continue</p>

                <label>Email</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

                <label>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />

                {message && <p className="error-message">{message}</p>}

                <button className="primary-button full-button" disabled={loading}>
                    {loading ? "Please wait..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
