const express = require("express");
const participantRoute = express.Router();
const participantController = require("../controllers/participantController")
const { bearerTokenAuth } = require("../middlewares/auth")
const {validateAddParticipant, validateUpdateParticipant} = require("../validations/participantValidator")


participantRoute.get("/participants", participantController.getParticipants)

participantRoute.get("/participants/:id", participantController.getParticipantById)

participantRoute.post("/participants", validateAddParticipant, bearerTokenAuth, participantController.createParticipant)

participantRoute.patch("/participants/:id", validateUpdateParticipant, bearerTokenAuth, participantController.updateParticipant)

participantRoute.delete("/participants/:id", bearerTokenAuth, participantController.deleteParticipant)

module.exports = participantRoute;
