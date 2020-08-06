require("dotenv").config();
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

const mongoFun = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://ararat:maxt9leo123@cluster0.skcm1.gcp.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Succsessfuly conected");
  } catch (error) {
    throw error;
  }
};
mongoFun();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(methodOverride("X-HTTP-Method-Override"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header(
    "Access-Control-Request-Method",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );

  next();
});

app.use("/api/v1/notifications", require("./src/routes/notifcations.js"));

// app.use((req, res) => {
//   res.status(500).send({ error: true, message: "Something went wrong" });
// });
app.get("/", (req, res) => {
  res.status(200).send("yes");
});

http.createServer({}, app).listen(process.env.PORT);
