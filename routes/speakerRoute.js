const express = require("express");
const speakerRoute = express.Router();
const speakerController = require("../controllers/speakerController")
const { bearerTokenAuth } = require("../middlewares/auth")


speakerRoute.get("/speakers", speakerController.getSpeakers)

speakerRoute.get("/speakers/:id", speakerController.getSpeakerById)

speakerRoute.post("/speakers", bearerTokenAuth, speakerController.createSpeaker)

speakerRoute.patch("/speakers/:id", bearerTokenAuth, speakerController.updateSpeaker)

speakerRoute.delete("/speakers/:id", bearerTokenAuth, speakerController.deleteSpeaker)

module.exports = speakerRoute;
