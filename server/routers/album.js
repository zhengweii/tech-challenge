const axios = require("axios");
const { Router } = require("express");

const { API } = require("../constants");
const auth = require("../middleware/auth");

const router = new Router();

/**
 * Gets all albums associated with the user.
 */
router.get("/albums", auth, async (req, res) => {
    try {
        const { user } = req;
        const albums = await axios.get(`${API}/albums?userId=${user.id}`);

        res.send({ albums: albums.data });
    }
    catch (error) {
        res.status(400).send({
            error: {
                message: "Could not get albums"
            }
        });
    }
});

/**
 * Gets a specific album associated with the user.
 */
router.get("/albums/:id", auth, async (req, res) => {
    try {
        const { user } = req;
        const albumId = req.params.id;
        const album = await axios.get(`${API}/albums?userId=${user.id}&id=${albumId}`);

        res.send({ album: album.data });
    }
    catch (error) {
        res.status(400).send({
            error: {
                message: "Could not get album"
            }
        });
    }
});

module.exports = router;
