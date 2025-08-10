import jwt from "jsonwebtoken";
const secKey = "Rakshitb";

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Unauthorized, token missing or malformed' });
    }

    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, secKey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized, invalid or expired token' });
    }
};

export {ensureAuthenticated};