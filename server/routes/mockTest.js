const express = require("express");
const router = express.Router();
const { getUserDetails } = require("../controllers/mockTestController");

router.route("/users").get(getUserDetails);

module.exports = router;
