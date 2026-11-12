import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProductTable({ products, onDelete }) {
    const { user } = useAuth();

    if (products.length === 0) {
        return <p className="empty-message">No products found.</p>;
    }

    return (
        <div className="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Details</th>
                        {user.role === "admin" && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>₹{product.price}</td>
                            <td>{product.quantity}</td>
                            <td><Link to={"/products/" + product._id}>View</Link></td>
                            {user.role === "admin" && (
                                <td className="actions">
                                    <Link to={"/products/" + product._id + "/edit"}>Edit</Link>
                                    <button className="text-button danger-text" onClick={() => onDelete(product._id)}>
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;
