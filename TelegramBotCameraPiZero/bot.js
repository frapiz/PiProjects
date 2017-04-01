var authorized_users = [
  11111111,
];

// Include required libraries
var Bot = require('node-telegram-bot');

var RaspiCam = require("raspicam");


    var opts = {
        mode: "photo",
		output: "/home/pi/Desktop/bot/currentPhoto.jpg",
        quality: 10,
        width: 1024,
        height: 768,
        timeout: 1};
		
var camera = new RaspiCam(
	opts
);
var fs = require('fs');

		
		
// Initialize and start Telegram BOT (insert your real token)
var bot = new Bot({
  token: '#######MY_TOKEN#######'
});

// Attach event on every received message 
bot.on('message', function (message) {
	 camera.start( opts ); 
     echo(message);
});

// Start the bot
bot.start();
console.log("BOT ready!");

// Function that handles a new message
function echo(message) {
  // if(!isAuthorized(message.from.id)) 
  //	   return;
  
  bot.sendMessage({
	  chat_id: message.chat.id,
	  text: 'User ID ' + message.from.id + ' says "' + message.text + '"',
  });
  
  setTimeout(function() {
    bot.sendPhoto({
    chat_id : message.chat.id,
    caption: 'test image',
	files: {
			 photo: 'currentPhoto.jpg'   
    }
});
}, 2000);
}


// Function that checks if the user is authorized (its id is in the array)
function isAuthorized(userid) {

  for(i = 0; i < authorized_users.length; i++) 
    if(authorized_users[i ] == userid) return true;
 
  return false;
}

