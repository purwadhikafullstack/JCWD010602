const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env")});
const express = require("express");
const cors = require("cors");
const { join } = require("path");

const PORT = process.env.PORT || 8000;
const {
  authRoutes,
  propertyRoutes,
  roomRoutes,
  transactionsRoutes,
  availRoutes,
} = require("./routes");
const app = express();
// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//         process.env.WHITELISTED_DOMAIN.split(","),
//     ],
//   })
// );
app.use(cors());
app.use(express.json());

// const db = require("./models");
// const { sequelize } = "./models";
// db.sequelize.sync({ alter: true });
// // //#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/avail", availRoutes);
app.use("/api/transactions", transactionsRoutes);

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "/public/ROOM";
app.use("/room_picture", express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
