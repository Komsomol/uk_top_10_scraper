// jshint esversion : 6
const express = require('express');
const app = express();
const pug = require('pug');
const compression = require('compression');

const bodyParser = require('body-parser');

// custom files
const gettop10 = require('./gettop10.js');
const getVideo = require('./youtube.js');

// use body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// use compression
app.use(compression());

// set view engine
app.set('view engine', 'pug');
// set static path for files
app.use(express.static('./views/'));

// set port
app.set('port',(process.env.PORT || 5000));

app.get('/', (request, response ) => {
	gettop10()
		.then(
		 	(value) => {
				// response.send(value);
				response.render('index', {
					title: 'UK Box Office Top 10',
					message:'UK Box Office Top 10',
					data: value
				});
				// console.log(value);
			},
			(reason) => {
				console.error('Something went wrong', reason);
			});
});

app.get('/detail/:name', (request, response ) => {
	// console.log(request.params.name);
	var name = request.params.name;
	// response.send(name);

	getVideo((request.params.name).replace('(3D)', '')).then((data) => {
		// console.log(data);
		response.render('detail', {
			title: request.params.name,
			message: request.params.name,
			video : data.url
		});
	});
});



app.listen( app.get( 'port' ), () => {
	console.log('express is up');
});