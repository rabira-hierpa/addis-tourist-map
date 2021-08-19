const router = require("express").Router();
const Guesthouses = require("../models/Guesthouses");

//get all guesthouse
router.get("/", async (req, res) => {
  try {
    const guesthouses = await Guesthouses.find();
    res.status(200).json(guesthouses);
    console.log("GET guesthouses: sent " + guesthouses.length + " items");
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

module.exports = router;
