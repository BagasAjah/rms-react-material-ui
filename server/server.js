// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const cors       = require('cors')
const morgan     = require('morgan');
const employee = require('./all-employee.json')

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port     = 3333; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
const router = express.Router();

// middleware to use for all requests
router.use( (req, res, next) => {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/employee')

	// get all the employee (accessed at GET http://localhost:8080/api/employee)
	.get(function(req, res) {
        res.status(200).json(employee)
	});

const byID = id => employee =>
    (id === employee.id)

router.route('/employee/:emp_id')
	// get the employee by id (accessed at GET http://localhost:8080/api/employee)
    .get(function(req, res) {
        const emp = employee.filter(byID(req.params.emp_id));
        res.status(200).json(emp)
    });

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
