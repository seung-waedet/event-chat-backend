const express = require("express")
const app = express();
const logger = require("morgan")
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute")
const questionRoute = require("./routes/questionRoute")
const participantRoute = require("./routes/participantRoute")
const db = require("./db")
const swaggerSetup = require('./swagger');
const cors = require('cors')

app.use(cors())

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