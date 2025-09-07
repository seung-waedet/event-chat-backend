const express = require("express");
const participantRoute = express.Router();
const participantController = require("../controllers/participantController");
const { bearerTokenAuth, checkAdmin } = require("../middlewares/auth");
const {
  participantSchema,
  editParticipantSchema,
} = require("../validations/participantValidator");
const validate = require("../middlewares/validate");

participantRoute.get(
  "/participants",
  bearerTokenAuth,
  checkAdmin,
  participantController.getParticipants,
);

participantRoute.get(
  "/participants/:id",
  bearerTokenAuth,
  checkAdmin,
  participantController.getParticipantById,
);

participantRoute.post(
  "/participants",
  validate(participantSchema),
  bearerTokenAuth,
  checkAdmin,
  participantController.createParticipant,
);

participantRoute.patch(
  "/participants/:id",
  validate(editParticipantSchema),
  bearerTokenAuth,
  checkAdmin,
  participantController.updateParticipant,
);

participantRoute.delete(
  "/participants/:id",
  bearerTokenAuth,
  checkAdmin,
  participantController.deleteParticipant,
);

module.exports = participantRoute;
