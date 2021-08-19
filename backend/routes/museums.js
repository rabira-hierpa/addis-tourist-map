const router = require("express").Router();
const Museums = require("../models/Museums");

//get all attraction sites
router.get("/", async (req, res) => {
  try {
    const museums = await Museums.find();
    res.status(200).json(museums);
    console.log("GET museums: sent " + museums.length + " items");
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

module.exports = router;
