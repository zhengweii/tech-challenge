const axios = require("axios");
const { Router } = require("express");

const { API } = require("../constants");
const auth = require("../middleware/auth");
const User = require("../models/user");

const router = new Router();

router.get("/users", async (req, res) => {
    try {
        const users = await axios.get(`${API}/users`);
        res.send({ users: users.data });
    }
    catch (error) {
        res.status(400).send({
            error: {
                message: "Could not get users"
            }
        });
    }
});

router.post("/sign-up", async (req, res) => {
    try {
        const { body } = req;
        const user = new User(body);
        await user.save();

        const authToken = await user.generateAuthToken();
        res.status(201).send({ user, authToken });
    }
    catch (error) {
        res.status(400).send({
            error: {
                message: error.message
            }
        });
    }
});

router.post("/sign-in", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.signInWithEmailAndPassword(email, password);
        const authToken = await user.generateAuthToken();
        res.status(200).send({ user, authToken });
    }
    catch (error) {
        res.status(401).send({
            error: {
                message: error.message
            }
        });
    }
});

router.post("/sign-out", auth, async (req, res) => {
    try {
        const { user, authToken } = req;

        user.authTokens = user.authTokens.filter(token => token.authToken !== authToken);
        await user.save();
        res.status(200).send();
    }
    catch (error) {
        res.status(401).send({
            error: {
                message: error.message
            }
        });
    }
});

router.post("/sign-out-all", auth, async (req, res) => {
    try {
        const { user } = req;

        user.authTokens = [];
        await user.save();
        res.status(200).send();
    }
    catch (error) {
        res.status(401).send({
            error: {
                message: error.message
            }
        });
    }
});

module.exports = router;
