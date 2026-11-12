import { useState } from "react";
import { apiRequest } from "../services/api";

function Users() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        setSuccess(false);

        try {
            await apiRequest("/api/auth/create-user", {
                method: "POST",
                body: JSON.stringify(form)
            });

            setMessage("Staff account created successfully");
            setSuccess(true);
            setForm({ name: "", email: "", password: "" });
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div className="form-page">
            <h1>Create Staff account</h1>
            <p className="muted">Only Admin can create Staff accounts</p>

            <form className="content-card form-card" onSubmit={handleSubmit}>
                <label>Staff name</label>
                <input name="name" value={form.name} onChange={handleChange} required />

                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />

                <label>Temporary password</label>
                <input name="password" type="password" minLength="6" value={form.password} onChange={handleChange} required />

                {message && <p className={success ? "success-message" : "error-message"}>{message}</p>}

                <button className="primary-button">Create Staff</button>
            </form>
        </div>
    );
}

export default Users;
