const axios = require("axios");
const { Router } = require("express");

const { API } = require("../constants");
const auth = require("../middleware/auth");

const router = new Router();

/**
 * Gets all the photos associated with the user.
 */
router.get("/photos", auth, async (req, res) => {
    /*
     * We need to know which albumId belongs to the user.
     * This will then allow us to identify the photos that belong to the user by looking at their albumId.
     */
    try {
        const { albumsId } = req.body;
        const queryParameters = albumsId.map(x => "albumId=" + x + "&").join("");

        const photos = await axios.get(`${API}/photos?${queryParameters}`);

        res.send({ photos: photos.data });
    }
    catch (error) {
        res.status(400).send({
            error: {
                message: "Could not get photos"
            }
        });
    }
});

/**
 * Gets a specific photo associated with the user.
 */
router.get("/photos/:id", auth, async (req, res) => {
    try {
        const { albumsId } = req.body;
        const photoId = req.params.id;

        const photo = await axios.get(`${API}/photos?id=${photoId}`);

        // Check if the albumId of the photo belongs to the user
        if (photo.data.length !== 0 && albumsId.includes(photo.data[0].albumId)) {
            res.send({ photo: photo.data });
        }
        else {
            res.send({ photo: [] });
        }
    }
    catch (error) {
        res.status(400).send({
            error: {
                message: "Could not get photo"
            }
        });
    }
});

module.exports = router;
