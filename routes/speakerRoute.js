const express = require("express");
const speakerRoute = express.Router();
const speakerController = require("../controllers/speakerController")
const { bearerTokenAuth } = require("../middlewares/auth")
const {validateAddSpeaker, validateUpdateSpeaker} = require("../validations/speakerValidator")


speakerRoute.get("/speakers", speakerController.getSpeakers)

speakerRoute.get("/speakers/:id", speakerController.getSpeakerById)

speakerRoute.post("/speakers", validateAddSpeaker, bearerTokenAuth, speakerController.createSpeaker)

speakerRoute.patch("/speakers/:id", validateUpdateSpeaker, bearerTokenAuth, speakerController.updateSpeaker)

speakerRoute.delete("/speakers/:id", bearerTokenAuth, speakerController.deleteSpeaker)

module.exports = speakerRoute;
