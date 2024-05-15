const express = require("express");
const eventRoute = express.Router();
const eventController = require("../controllers/eventController")
const { bearerTokenAuth, checkAdmin } = require("../middlewares/auth")
const {validateAddEvent, validateUpdateEvent, eventSchema} = require("../validations/eventValidator")
const  validate  = require("../middlewares/validate")


eventRoute.get("/events", bearerTokenAuth, checkAdmin, eventController.getEvents)

eventRoute.get("/events/:id", bearerTokenAuth, checkAdmin, eventController.getEventById)

eventRoute.post("/events", validate(eventSchema), bearerTokenAuth, checkAdmin, eventController.createEvent)

eventRoute.patch("/events/:id", validate(eventSchema), bearerTokenAuth, checkAdmin, eventController.updateEvent)

eventRoute.delete("/events/:id", bearerTokenAuth, checkAdmin, eventController.deleteEvent)

module.exports = eventRoute;
