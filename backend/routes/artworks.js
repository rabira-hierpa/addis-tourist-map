const router = require("express").Router();
const Artworks = require("../models/Artworks");

//get all artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await Artworks.find();
    res.status(200).json(artworks);
    console.log("GET Artworks: sent " + artworks.length + " items");
  } catch (err) {a
    res.status(500).json(err);
    console.error(err);
  }
});

module.exports = router;
