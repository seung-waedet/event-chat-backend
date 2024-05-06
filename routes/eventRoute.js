const express = require("express");
const eventRoute = express.Router();
const eventController = require("../controllers/eventController")

eventRoute.get("/events", eventController.getEvents)

eventRoute.get("/events/:id", eventController.getEventById)

eventRoute.post("/events", eventController.createEvent)

eventRoute.patch("/events/:id", eventController.updateEvent)

eventRoute.delete("/events/:id", eventController.deleteEvent)

module.exports = eventRoute;
