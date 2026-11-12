import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ProductForm from "./pages/ProductForm";
import Users from "./pages/Users";

function App() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route element={<ProtectedRoute adminOnly />}>
                        <Route path="/products/add" element={<ProductForm />} />
                        <Route path="/products/:id/edit" element={<ProductForm />} />
                        <Route path="/users" element={<Users />} />
                    </Route>
                    <Route path="/products/:id" element={<ProductDetails />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
    );
}

export default App;
