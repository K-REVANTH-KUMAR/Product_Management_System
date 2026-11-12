const express = require("express");
const Product = require("../models/Product");
const { checkAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// Dashboard statistics
router.get("/dashboard", checkAuth(["admin", "staff"]), async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const allProducts = await Product.find();
        let totalStock = 0;
        let lowStock = 0;

        for (let i = 0; i < allProducts.length; i++) {
            totalStock = totalStock + allProducts[i].quantity;

            if (allProducts[i].quantity < 5) {
                lowStock = lowStock + 1;
            }
        }

        res.json({
            totalProducts: totalProducts,
            totalStock: totalStock,
            lowStock: lowStock
        });
    } catch (error) {
        res.status(500).json({ message: "Could not load dashboard", error: error.message });
    }
});

// View and search products
router.get("/", checkAuth(["admin", "staff"]), async (req, res) => {
    try {
        const search = req.query.search || "";
        const category = req.query.category || "";

        let filter = {};

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Could not retrieve products", error: error.message });
    }
});

// View one product
router.get("/:id", checkAuth(["admin", "staff"]), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(400).json({ message: "Invalid product ID" });
    }
});

// Add product - Admin only
router.post("/", checkAuth(["admin"]), async (req, res) => {
    try {
        const { name, category, price, quantity, description } = req.body;

        if (!name || !category || price === undefined || quantity === undefined) {
            return res.status(400).json({ message: "Name, category, price and quantity are required" });
        }

        if (Number(price) < 0 || Number(quantity) < 0 || !Number.isInteger(Number(quantity))) {
            return res.status(400).json({ message: "Enter a valid price and whole-number quantity" });
        }

        const product = await Product.create({
            name: name,
            category: category,
            price: Number(price),
            quantity: Number(quantity),
            description: description || ""
        });

        res.status(201).json({ message: "Product added successfully", product: product });
    } catch (error) {
        res.status(400).json({ message: "Could not add product", error: error.message });
    }
});

// Update product - Admin only
router.put("/:id", checkAuth(["admin"]), async (req, res) => {
    try {
        const { name, category, price, quantity, description } = req.body;

        if (price !== undefined && Number(price) < 0) {
            return res.status(400).json({ message: "Price cannot be negative" });
        }

        if (quantity !== undefined && (Number(quantity) < 0 || !Number.isInteger(Number(quantity)))) {
            return res.status(400).json({ message: "Quantity must be a whole number of 0 or more" });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: name,
                category: category,
                price: price,
                quantity: quantity,
                description: description
            },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product updated successfully", product: product });
    } catch (error) {
        res.status(400).json({ message: "Could not update product", error: error.message });
    }
});

// Delete product - Admin only
router.delete("/:id", checkAuth(["admin"]), async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid product ID" });
    }
});

module.exports = router;
