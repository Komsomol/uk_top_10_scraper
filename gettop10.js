// jshint esversion:6

/*
	// Usage

	getTop10()
	.then(
		function (value) {
			console.log('Contents: ' + value);
		},
		function (reason) {
			console.error('Something went wrong', reason);
		});
*/


const got = require('got');
const cheerio = require('cheerio');

const getTop10 = () => {
	let top10url = "http://www.launchingfilms.com/research-databank/current-top-15-films";

	return new Promise((resolve, reject) => {
		got(top10url)
			.then(response => {

				let $ = cheerio.load(response.body);

				let finallist = [];
				
				let list = $('.movieRow .col2').text().replace(/[\r\t]/g, '').split('\n');

				for (let i = 0; i < list.length; i++) {
					if(list[i] === ""){
						console.log(list[i]);
					} else {
						finallist.push(list[i]);
					}
				}

				resolve(finallist);
			})
			.catch(error => {
				reject(error.response.body);
		});
	});
};


module.exports = getTop10;