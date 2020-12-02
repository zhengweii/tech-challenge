const jwt = require("jsonwebtoken");

const User = require("../models/user");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = async (req, res, next) => {
    try {
        const authToken = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(authToken, JWT_SECRET_KEY);
        const user = await User.findOne({ _id: decoded.userID, "authTokens.authToken": authToken });

        if (!user) {
            throw new Error();
        }

        // Attaches the user info and auth token to the req
        req.user = user;
        req.authToken = authToken;
        next();
    }
    catch (error) {
        res.status(401).send({
            error: {
                message: "Authentication failed."
            }
        });
    }
};
