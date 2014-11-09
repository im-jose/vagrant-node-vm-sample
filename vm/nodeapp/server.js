// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('etag', 'strong');

var port = process.env.PORT || 8080; 		// set our port

//connect to database
var mongoose   = require('mongoose');
mongoose.connect('mongodb://bbjramirez82:1234@dogen.mongohq.com:10056/bb_users_db');
var User = require('./app/models/user');

// ROUTES FOR OUR API
// =============================================================================
// get an instance of the express Router
var router = express.Router(); 

// middleware to use for all requests
router.use(function(req, res, next) 
{
	// do logging, validation, etc
	console.log(JSON.stringify(req.headers, null, 2));
	console.log('------------------------------');
	
	// TESTING HEADERS:
	// Accept: text/*, application/json
	// Accept: text/*
	// Accept: text/html
	
	if (!req.accepts('application/json')) 
	{
		res.statusCode = 406;
		res.type('txt').send('This is JSON API only');
		return;
	}
	
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) 
{
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/users')

	// create a user (accessed at POST http://localhost:8080/api/users)
	.post(function(req, res) 
	{
		// validates the basic properties to create a new user
		if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('lastname') || !req.body.hasOwnProperty('email')) 
		{
			res.statusCode = 400;
			return res.send('Error 400: Post syntax incorrect.');
		} 
		
		// create a new instance of the User model
		var user = new User();		
		
		// set the user properties (comes from the request)
		user.name = req.body.name;
		user.lastname = req.body.lastname;
		user.email = req.body.email;

		user.save(function(err) 
		{
			if (err)
			{
				res.send(err);
			}
			res.statusCode = 201;
			res.json({ message: 'User successfully created!' });
		});

	})

	// get all the users (accessed at GET http://localhost:8080/api/users)
	.get(function(req, res) 
	{
		if(req.fresh)
		{
			res.statusCode = 304;
			res.end();
			return;
		}
		
		User.find(function(err, users) 
		{
			if (err)
			{
				res.send(err);
			}

			res.json(users);
		});
	});

router.route('/users/:user_id')

	// get the user with that id
	.get(function(req, res) 
	{
		User.findById(req.params.user_id, function(err, user) 
		{
			if (err)
			{
				res.statusCode = 404;
				res.send(err);
			}
			res.json(user);
		});
	})

	// update the user with this id
	.put(function(req, res) 
	{
		// validates the basic properties to update user
		if(!req.body.hasOwnProperty('name') && !req.body.hasOwnProperty('lastname') && !req.body.hasOwnProperty('email')) 
		{
			res.statusCode = 400;
			return res.send('Error 400: Put syntax incorrect.');
		} 
		
		User.findById(req.params.user_id, function(err, user) 
		{
			if (err)
			{
				res.send(err);
			}
			// set the user properties
			user.name = req.body.name ? req.body.name : user.name;
			user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
			user.email = req.body.email ? req.body.email : user.email;
			
			user.save(function(err) 
			{
				if (err)
				{
					res.send(err);
				}
				res.json({ message: 'User updated!' });
			});

		});
	})

	// delete the user with this id
	.delete(function(req, res) 
	{
		User.remove({
			_id: req.params.user_id
		}, 
		function(err, user) 
		{
			if (err)
			{
				res.send(err);
			}
			res.json({ message: 'User successfully deleted' });
		});
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
