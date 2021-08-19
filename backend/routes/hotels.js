const router = require("express").Router();
const Hotels = require("../models/Hotels");

//get all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotels.find();
    res.status(200).json(hotels);
    console.log("GET hotels: sent " + hotels.length + " items");
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

module.exports = router;
