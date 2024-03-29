const express = require('express');
const router = express.Router();
const fs = require("fs");
const { uuid } = require('uuidv4');
// read videos.json file
const videoDetails = () => {
    const videoJSON = fs.readFileSync("./data/videos.json");
    const videoParsed = JSON.parse(videoJSON);
    return videoParsed
}
router.use((_req, _res, next) => {
    console.log("Middleware from video router");
    next();
});
// get short details on videos
router.get("/", (_req, _res) => {
    const videos = videoDetails();
    const videoPlaylist = videos.map(({id, title, channel, image}) => ({id, title, channel, image}))
    _res.json(videoPlaylist);
})
//get details of a specifiv video
router.get("/:id", (req, res) => {
    const videos = videoDetails();
    const findVideo = videos.find((video) => video.id === req.params.id);
    // console.log(findVideo);
    console.log(req.params.id);
    res.json(findVideo);
})
// post new video details and write into json file
router.post("/", (req, res) => {
    const newVideo = {
        id: uuid(),
        title: req.body.title,
        channel: "Mohan Murage",
        image: "http://localhost:8080/Upload-video-preview.jpg",
        description: req.body.description,
        views:0,
        likes: 0,
        duration: "5:17",
        video: "http://localhost:8080/BrainStation-Sample-Video.mp4",
        timestamp: Date.now(),
        comments: []
    }
    const videos = videoDetails();
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    res.status(200).json(newVideo);
})
// get comments of specific video
router.get("/:id/comments", (req, res) => {
    const videos = videoDetails();
    const findVideo = videos.find((video) => video.id === req.params.id);
    // console.log(findVideo);
    console.log(req.params.id);
    res.json(findVideo.comments);
})
// post comment into json file
router.post("/:id/comments", (req, res) => {
    const newComment = {
        id: uuid(),
        name: "Mohan Murage",
        comment: req.body.comment,
        likes: 0,
        timestamp: Date.now()
    }
    const videos = videoDetails();
    const id = req.params.id;
    console.log(id);
    const updatedComments = videos.map(video => {
        if (video.id === id) {
            video.comments.push(newComment)
        }
        return video
        } 
    )
    fs.writeFileSync("./data/videos.json", JSON.stringify(updatedComments));
    res.status(200).json(updatedComments);
})

module.exports = router