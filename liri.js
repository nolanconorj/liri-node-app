//Grab the data from keys.js. Then store the keys in a variable
var keys = require("./keys.js");
console.log(keys);
//-------------------------------
//REQUIRES
var Twitter = require("twitter");

//Make it so liri.js can take in one of the following commands. List out commands.
var command = process.argv[2];

switch (command) {
    case "my-tweets":
    tweets();
      break;
  
    case "spotify-this-song":
      spotify();
      break;
  
    case "movie-this":
      movie();
      break;
  
    case "do-what-it-says":
      doit();
      break;
  };
//---------------------------------
//FUNCTIONS
//TWITTER--------------------------
function tweets() {
    console.log("works1!!");

    var client = new Twitter({
        consumer_key: keys.consumer_key,
        consumer_secret: keys.consumer_secret,
        access_token_key: keys.access_token_key,
        access_token_secret: keys.access_token_secret
      });

    var params = {
        screen_name: "RUcnolan",
        count: 20,
    };
      client.get('statuses/user_timeline', params, function(error, tweet, response) {
        if(!error){
        console.log(tweet);  // Tweet body. 
        console.log(response);  // Raw response object.
        }
        else{
            console.log("Whoops! Something went wrong!")
        } 
      });  
};

function spotify() {
    console.log("works2!!");
        };

function movie() {
    console.log("works3!!");
        };

function doit() {
    console.log("works4!!");
        };
//-----------------------------------        