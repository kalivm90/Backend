const express = require("express");
// TO GROUP ROUTES YOU USE express.Router and export it to the main app.js file.
const router = express.Router();

// Home route
router.get("/", (req, res) => {
    res.send("Wiki home page")
})

router.get("/about", (req, res) => {
    res.send("About this wiki")
})

router.get("/help", (req, res) => {
    res.send("Help yourself")
})

module.exports = router;