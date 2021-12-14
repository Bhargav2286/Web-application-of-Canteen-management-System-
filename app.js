var express 		= require("express"),
	app				= express(),
	mongoose 		= require("mongoose"),
	bodyParser		= require("body-parser"),
	methodOverride	= require("method-override"),
	cookieParser = require("cookie-parser"),
	expressSession = require("express-session"),
	passport = require("passport");

var	seedDB			= require("./seeds"),
	Items			= require("./models/item"),
	Comment 		= require("./models/comment"),
	Checkout 		= require("./models/checkout"),
	Order			= require("./models/order"),
	User      = require("./models/user"),
	PassportService = require("./services/passport");

var itemRoutes		= require("./routes/item"),
	commentRoutes	= require("./routes/comments"),
	checkoutRoute	= require("./routes/checkout"),
	authRoutes = require("./routes/auth");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/online_canteen", {useMongoClient: true});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(expressSession({
	secret: 'online canteen',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/Items", itemRoutes);
app.use("/Items/:id/comment", commentRoutes);
app.use(checkoutRoute);
app.use(authRoutes);

seedDB();

// HOME
app.get("/", function(req, res){
	res.render("home", {user: req.user});
});

app.listen(8080, function(){
	console.log("Starting Server");
});
