const express = require("express");
const nanoid = require("nanoid");
const { getAllUsers, addNewUser, getGamesByUser } = require("../controllers/user-controller");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
  console.log("visiting user-routes");
  res.send({ message: "seeing user-routes" });
});

router.get("/:username", getGamesByUser)

router.post("/new-user", addNewUser);


module.exports = { userRoutes: router };
