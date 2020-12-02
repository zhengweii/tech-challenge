const express = require("express");

require("./database/mongoose");
const albumRouter = require("./routers/album");
const photoRouter = require("./routers/photo");
const userRouter = require("./routers/user");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(albumRouter);
app.use(photoRouter);
app.use(userRouter);

app.get("/", (req, res) => {
    res.send("Mavennet Tech Challenge");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = {
    app
};
