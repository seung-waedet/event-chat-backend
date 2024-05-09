const express = require("express")
const app = express();
const logger = require("morgan")
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute")
const questionRoute = require("./routes/questionRoute")
const speakerRoute = require("./routes/speakerRoute")
const db = require("./db")

const PORT = process.env.PORT || 3000

app.use(express.json());

db.connectToDb();

// logger
app.use(logger("dev"));

// Routes
app.use("/api", userRoute, eventRoute, questionRoute, speakerRoute)


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