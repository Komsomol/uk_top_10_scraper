// jshint esversion:6

/*
	youtube video usage

	getVideo('doom').then(function(data){
		console.log(data);
	});
*/
const youtubeapp = require('youtube-node');
const youtube = new youtubeapp();
// const env = require('env2')('./.env');


youtube.setKey(process.env.YOUTUBE_API_KEY);

const getVideo = (name) => {
	return new Promise((resolve, reject) => {
		youtube.search(name + 'Trailer', 2, (error, result) => {
			if (error) {
				console.log(error);
				return reject({status:false});
			}
			else {
				console.log(result);
				if(result.pageInfo.totalResults === 0){
					return reject({status:false});
				} else {
					// var url = "https://www.youtube.com/watch?v=" + result.items[0].id.videoId;
					var url = "https://www.youtube.com/embed/" + result.items[0].id.videoId;
					return resolve({status:true, url:url});
				}
			}
		});
		
	});
};


module.exports = getVideo;