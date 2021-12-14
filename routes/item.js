var express = require("express"),
	router = express.Router({mergeParams: true}),
	Items = require("../models/item");

var requireLogin = require("../middlewares/requireLogin");

var categories = ["Soups", "Sandwiches", "Desserts"];

// INDEX - Get all
router.get("/", requireLogin, function(req, res){
	// console.log("[item]", req.url);
	Items.find({}, function(err, items){
		if(err){
			console.log(err);
		} else {
			res.render("foodItems/index", {items: items, categories: categories, user: req.user});
		}
	});
});

// CREATE - create new items - only accessable by the manager - login required
router.get("/new", requireLogin, function(req, res){
	// console.log("[item]", req.url);
	res.render("manager/addNew", {user: req.user});
});

router.post("/Items/new", requireLogin, function(req, res){
	// console.log("[item]", req.url);
	Items.create(req.body.items, function(err, items){
		if(err){
			console.log(err);
		} else {
			res.redirect("/Items");
		}
	});
});

// EDIT - edit existing items - only accessable by the manager - login required
router.get("/:id/edit", requireLogin, function(req, res){
	// console.log("[item]", req.url);
	Items.findById(req.params.id, function(err, item){
		if(err){
			console.log(err);
		} else {
			res.render("manager/edit", {item: item, user: req.user});
		}
	});
});

// UPDATE - update the edited item - only accessable by the manager - login required
router.put("/:id/edit", requireLogin, function(req, res){
	// console.log("[item]", req.url);
	Items.findByIdAndUpdate(req.params.id, req.body.items, function(err, item){
		if(err){
			console.log(err);
		} else {
			res.redirect("/Items/" + req.params.id);
		}
	});
});

// DELETE - delete an existing item - only accessable by the manager - login required
router.delete("/:id/delete", requireLogin, function(req, res){
	// console.log("[item]", req.url);
	Items.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect("/Items");
		}
	});
});

// SHOW - show individual
router.get("/:id", requireLogin, function(req, res){
	// console.log("[item]", req.url);
	Items.findById(req.params.id).populate("comments").exec(function(err, item){
		if(err){
			console.log(err);
		} else {
			res.render("foodItems/show", {item: item, user: req.user});
		}
	});
});

module.exports = router;
