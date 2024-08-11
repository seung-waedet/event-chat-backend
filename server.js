const express = require("express")
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const logger = require("morgan")
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute")
const questionRoute = require("./routes/questionRoute")
const participantRoute = require("./routes/participantRoute")
const db = require("./db")
const swaggerSetup = require('./swagger');
const cors = require('cors')


const server = http.createServer(app);

app.use(cors())
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Adjust this to your frontend URL
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }));

app.use(express.json());


db.connectToDb();

// logger
app.use(logger("dev"));

swaggerSetup(app);

// Routes
app.use("/api", userRoute, eventRoute, questionRoute, participantRoute)


app.get("/", (req, res) => {
    res.status(200).json({ status: true, message: `EventChat` });
  });


// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

  // Error Handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
  });
  
  module.exports = app;