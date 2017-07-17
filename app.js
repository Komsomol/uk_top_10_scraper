// jshint esversion : 6
const express = require('express');
const app = express();
const pug = require('pug');

const bodyParser = require('body-parser');
const gettop10 = require('./gettop10.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('port',(process.env.PORT || 5000));

console.log('starts');

app.get('/', (request, response ) => {
	gettop10()
		.then(
		 	(value) => {
				// response.send(value);
				response.render('index', {
					title: 'UK Box Office Top 10',
					message:'UK Box Office Top 10',
					data:value
				});
				// console.log(value);
			},
			(reason) => {
				console.error('Something went wrong', reason);
			});
});

app.listen( app.get( 'port' ), () => {
	console.log('express is up');
});