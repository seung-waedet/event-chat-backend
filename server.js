const express = require("express")
const app = express();
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute")
const questionRoute = require("./routes/questionRoute")
const speakerRoute = require("./routes/speakerRoute")
const db = require("./db")

const PORT = process.env.PORT || 3000

app.use(express.json());

db.connectToDb();

// Routes
app.use("/api", userRoute, eventRoute, questionRoute, speakerRoute)


app.get("/", (req, res) => {
    res.status(200).json({ status: true, message: `EventChat` });
  });



  // Error Handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    //send the first line of an error message
    if (err instanceof Error)
      return res.json({ error: err.message.split(os.EOL)[0] });
  
    res.json({ error: err.message });
  });
  
  app.use("*", (req, res) => {
    res.status(404).json({ status: false, message: `Route not found` });
  });

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
  });
  
  module.exports = app;