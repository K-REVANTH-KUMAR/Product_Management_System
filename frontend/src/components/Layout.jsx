import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <h2>Product Manager</h2>
                <p className="small-text">Inventory application</p>

                <nav>
                    <NavLink to="/">Dashboard</NavLink>
                    <NavLink to="/products">Products</NavLink>
                    {user.role === "admin" && <NavLink to="/users">Staff</NavLink>}
                </nav>

                <div className="sidebar-bottom">
                    <p>{user.name}</p>
                    <p className="small-text">{user.role}</p>
                    <button className="secondary-button full-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </aside>

            <main className="main-area">
                <header className="top-header">
                    <span>Product Management System</span>
                    <span>{user.role.toUpperCase()}</span>
                </header>
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;
