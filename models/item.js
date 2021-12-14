var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
	name: String,
	description: String,
	image: String,
	category: String,
	price: Number,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Items", foodSchema);