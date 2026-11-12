function ProductFields({ form, setForm }) {
    function handleChange(event) {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    return (
        <>
            <label>Product name</label>
            <input name="name" value={form.name} onChange={handleChange} required />

            <label>Category</label>
            <input name="category" value={form.category} onChange={handleChange} required />

            <label>Price</label>
            <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required />

            <label>Quantity</label>
            <input name="quantity" type="number" min="0" step="1" value={form.quantity} onChange={handleChange} required />

            <label>Description</label>
            <textarea name="description" rows="4" value={form.description} onChange={handleChange} />
        </>
    );
}

export default ProductFields;
