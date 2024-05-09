const express = require("express");
const eventRoute = express.Router();
const eventController = require("../controllers/eventController")
const { bearerTokenAuth } = require("../middlewares/auth")

eventRoute.get("/events", bearerTokenAuth, eventController.getEvents)

eventRoute.get("/events/:id", bearerTokenAuth, eventController.getEventById)

eventRoute.post("/events", bearerTokenAuth, eventController.createEvent)

eventRoute.patch("/events/:id", bearerTokenAuth, eventController.updateEvent)

eventRoute.delete("/events/:id", bearerTokenAuth, eventController.deleteEvent)

module.exports = eventRoute;
