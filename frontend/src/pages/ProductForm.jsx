import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductFields from "../components/ProductFields";
import { apiRequest } from "../services/api";

function ProductForm() {
    const { id } = useParams();
    const editing = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: ""
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (editing) {
            loadProduct();
        }
    }, [id]);

    async function loadProduct() {
        try {
            const product = await apiRequest("/api/products/" + id);
            setForm({
                name: product.name,
                category: product.category,
                price: product.price,
                quantity: product.quantity,
                description: product.description || ""
            });
        } catch (error) {
            setMessage(error.message);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        try {
            const url = editing ? "/api/products/" + id : "/api/products";
            const method = editing ? "PUT" : "POST";

            await apiRequest(url, {
                method: method,
                body: JSON.stringify({
                    ...form,
                    price: Number(form.price),
                    quantity: Number(form.quantity)
                })
            });

            navigate("/products");
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div className="form-page">
            <h1>{editing ? "Edit product" : "Add product"}</h1>
            <p className="muted">Enter the product information below</p>

            <form className="content-card form-card" onSubmit={handleSubmit}>
                <ProductFields form={form} setForm={setForm} />
                {message && <p className="error-message">{message}</p>}
                <div className="form-actions">
                    <button className="primary-button">{editing ? "Save changes" : "Add product"}</button>
                    <button type="button" className="secondary-button" onClick={() => navigate("/products")}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
