import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ adminOnly = false }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
