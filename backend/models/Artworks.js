const mongoose = require("mongoose")

const ArtworkSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
	},
	type:{
		type:String,
		required: true
	},
	features:{
		type: Array,
		required: true
	}
})

module.exports = mongoose.model("Artworks",ArtworkSchema)