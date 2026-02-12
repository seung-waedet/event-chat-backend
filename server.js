const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const logger = require("morgan");
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");
const questionRoute = require("./routes/questionRoute");
const participantRoute = require("./routes/participantRoute");
const db = require("./db");
const swaggerSetup = require("./swagger");
const cors = require("cors");

const server = http.createServer(app);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // Frontend URLs
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connectToDb();

// logger
app.use(logger("dev"));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.get("Origin") || "none"}`,
  );
  next();
});

swaggerSetup(app);

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api", userRoute);
app.use("/api", eventRoute);
app.use("/api", questionRoute(io)); // Pass io to questionRoute
app.use("/api", participantRoute);

app.get("/", (req, res) => {
  res.status(200).json({ status: true, message: `EventChat` });
});

// Debug endpoint to check database connection and events
app.get("/debug/events", async (req, res) => {
  try {
    const Event = require("./models/eventModel");
    const events = await Event.find({});
    res.status(200).json({
      dbStatus: "connected",
      eventCount: events.length,
      events: events
    });
  } catch (error) {
    res.status(500).json({
      dbStatus: "error",
      error: error.message
    });
  }
});

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join-event", ({ eventId, role }) => {
    socket.join(eventId);
    socket.role = role;
    console.log(`User with role ${role} joined event: ${eventId}`);
  });

  socket.on("leave-event", (eventId) => {
    socket.leave(eventId);
    console.log(`User left event: ${eventId}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Error Handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

server.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});

module.exports = { app, io };
