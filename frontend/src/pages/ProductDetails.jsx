import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        loadProduct();
    }, [id]);

    async function loadProduct() {
        try {
            const data = await apiRequest("/api/products/" + id);
            setProduct(data);
        } catch (error) {
            setMessage(error.message);
        }
    }

    if (message) {
        return <p className="error-message">{message}</p>;
    }

    if (!product) {
        return <p>Loading product...</p>;
    }

    return (
        <div>
            <h1>Product details</h1>
            <div className="content-card details-card">
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Quantity:</strong> {product.quantity}</p>
                <p><strong>Description:</strong> {product.description || "No description"}</p>
                <div className="form-actions">
                    {user.role === "admin" && (
                        <Link className="primary-button link-button" to={"/products/" + id + "/edit"}>Edit product</Link>
                    )}
                    <Link className="secondary-button link-button" to="/products">Back to products</Link>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
