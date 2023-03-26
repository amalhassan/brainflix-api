const express = require('express');
const app = express();
const PORT = 8080;
const videosRoutes = require("./routes/videos.js")
const cors = require("cors");
app.use(express.static("public"));
app.use(cors());

app.use(express.json());
app.use("/videos", videosRoutes);
app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
});