//Grab the data from keys.js. Then store the keys in a variable
var twitterKeys = require("./keys.js");
var spotifyKeys = require("./spotifyKeys.js");
//console.log(keys);
//-------------------------------
//REQUIRES
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

//Make it so liri.js can take in one of the following commands. List out commands.
//Command Line Arguments
var command = process.argv[2];
var name = process.argv.splice(3);




switch (command) {
    case "my-tweets":
    tweets();
      break;
  
    case "spotify-this-song":
      spotify(name);
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
    //console.log("works1!!");

    var client = new Twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
      });

    var params = {
        screen_name: "RUcnolan",
        count: 20,
    };
      client.get('statuses/user_timeline', params, function(error, tweet, text) {
        if(!error){
        //console.log(tweet);  // Tweet body. 
        //console.log(tweet[0].id); //Example of entering tweet object to grab info
        //console.log(response);  // Raw response object.
        for (i = 0; i < tweet.length; i++) {  //loop through tweet object to pull out all tweets and date they were created
            console.log("Tweet Text: " + tweet[i].text);
            console.log("Creation Date: " + tweet[i].created_at);
        }
        }
        else{
            console.log("Whoops! Something went wrong!")
        } 
      });  
};
//----------------------------------
//SPOTIFY---------------------------
function spotify(name) {
    //console.log("works2!!");

    var spotify = new Spotify({
        id: spotifyKeys.id,
        secret: spotifyKeys.secret       
      });
       
      spotify.search({ type: 'track', query: name }, function(err, data) {
        if (err) {
          return console.log('ERROR: Whoops! Something went wrong! Make sure you entered a song name!');

        }
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Preview Links: " + data.tracks.items[0].preview_url);
      console.log("Album: " + data.tracks.items[0].album.name);
      //console.log(data); 
      });
        };
//--------------------------
//OMDB----------------------
function movie() {
    //console.log("works3!!");
    
    
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=40e9cece";
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
    
      // If the request is successful
      if (!error && response.statusCode === 200) {
    
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Langauge: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
    

        };
//------------------------------
//fs call to txt file-----------
function doit() {
    //console.log("works4!!");

    fs.readFile("random.txt", "utf8", function(error, data) {
        
          // If the code experiences any errors it will log the error to the console.
          if (error) {
            return console.log(error);
          }
        
          // We will then print the contents of data
          //console.log(data);

          // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
  
    // We will then re-display the content as an array for later use.
        //console.log(dataArr[0]);
        //console.log(dataArr[1]);

        //spotify(name(dataArr[1]));

       
            spotify(dataArr[1]);
          
          

       
          
          
          
        
        });
        };
//-----------------------------------        