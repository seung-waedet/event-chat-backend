const express = require("express");
const participantRoute = express.Router();
const participantController = require("../controllers/participantController")
const { bearerTokenAuth } = require("../middlewares/auth")
const {participantSchema} = require("../validations/participantValidator")
const  validate  = require("../middlewares/validate")


participantRoute.get("/participants", participantController.getParticipants)

participantRoute.get("/participants/:id", participantController.getParticipantById)

participantRoute.post("/participants", validate(participantSchema), bearerTokenAuth, participantController.createParticipant)

participantRoute.patch("/participants/:id", validate(participantSchema), bearerTokenAuth, participantController.updateParticipant)

participantRoute.delete("/participants/:id", bearerTokenAuth, participantController.deleteParticipant)

module.exports = participantRoute;
