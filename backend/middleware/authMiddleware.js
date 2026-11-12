
const jwt = require("jsonwebtoken");

function checkAuth(allowedRoles = []) {
    return (req, res, next) => {

        // Get JWT from Authorization header
        const token = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : null;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required. Please login."
            });
        }

        try {
            // Verify JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Store decoded user information
            req.user = decoded;

            // Check user role
            if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({
                    message: "Access denied"
                });
            }

            next();

        } catch (error) {
            return res.status(401).json({
                message: "Invalid or expired token. Please login again."
            });
        }
    };
}

module.exports = { checkAuth };
