var mongoose = require("mongoose");

checkoutSchema = new mongoose.Schema({
	name: String,
	email: String,
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Orders"
		}
	],
	total: Number
});

module.exports = mongoose.model("Checkout", checkoutSchema);