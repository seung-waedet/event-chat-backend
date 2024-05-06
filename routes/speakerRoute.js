const express = require("express");
const speakerRoute = express.Router();
const speakerController = require("../controllers/speakerController")

speakerRoute.get("/speakers", speakerController.getSpeakers)

speakerRoute.get("/speakers/:id", speakerController.getSpeakerById)

speakerRoute.post("/speakers", speakerController.createSpeaker)

speakerRoute.patch("/speakers/:id", speakerController.updateSpeaker)

speakerRoute.delete("/speakers/:id", speakerController.deleteSpeaker)

module.exports = speakerRoute;
