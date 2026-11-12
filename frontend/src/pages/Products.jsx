import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        loadProducts();
    }, [search, category]);

    async function loadProducts() {
        try {
            let url = "/api/products?search=" + encodeURIComponent(search);
            url = url + "&category=" + encodeURIComponent(category);

            const data = await apiRequest(url);
            setProducts(data);
            setMessage("");
        } catch (error) {
            setMessage(error.message);
        }
    }

    async function deleteProduct(id) {
        const confirmed = window.confirm("Are you sure you want to delete this product?");

        if (!confirmed) {
            return;
        }

        try {
            await apiRequest("/api/products/" + id, { method: "DELETE" });
            loadProducts();
        } catch (error) {
            setMessage(error.message);
        }
    }

    const categories = [...new Set(products.map((product) => product.category))];

    return (
        <div>
            <div className="page-heading">
                <div>
                    <h1>Products</h1>
                    <p className="muted">View and manage product information</p>
                </div>
                {user.role === "admin" && (
                    <Link className="primary-button link-button" to="/products/add">Add product</Link>
                )}
            </div>

            <div className="filter-row">
                <input
                    placeholder="Search product name"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="">All categories</option>
                    {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
            </div>

            {message && <p className="error-message">{message}</p>}
            <ProductTable products={products} onDelete={deleteProduct} />
        </div>
    );
}

export default Products;
