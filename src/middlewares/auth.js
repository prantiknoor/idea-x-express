const { loadSavedCredentialsIfExist } = require("../utils");

const authMiddleware = async (req, res, next) => {
    const auth = await loadSavedCredentialsIfExist();
    if (auth) {
        req.auth = auth;
        next();
    } else {
        res.status(401).json({
            status: 401,
            message: "Authentication error",
        });
    }
};

module.exports = authMiddleware