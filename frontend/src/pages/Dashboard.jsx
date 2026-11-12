import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

function Dashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalStock: 0,
        lowStock: 0
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const data = await apiRequest("/api/products/dashboard");
            setStats(data);
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div>
            <div className="page-heading">
                <div>
                    <h1>Dashboard</h1>
                    <p className="muted">A quick summary of your products</p>
                </div>
            </div>

            {message && <p className="error-message">{message}</p>}

            <div className="stats-grid">
                <div className="stat-card">
                    <p>Total products</p>
                    <h2>{stats.totalProducts}</h2>
                </div>
                <div className="stat-card">
                    <p>Total stock quantity</p>
                    <h2>{stats.totalStock}</h2>
                </div>
                <div className="stat-card">
                    <p>Low-stock products</p>
                    <h2>{stats.lowStock}</h2>
                    <span className="muted small-text">Quantity below 5</span>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
