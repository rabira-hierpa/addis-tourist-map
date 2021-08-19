const router = require("express").Router();
const Attractions = require("../models/Attractions");

//get all attractions
router.get('/', async (req, res)=>{
	try{
		const attractions = await Attractions.find();
		res.status(200).json(attractions)
		console.log("GET Attractions: sent " + attractions.length + " items")
	}catch(err){
		res.status(500).json(err);
		console.error(err)
	}
})

module.exports = router;