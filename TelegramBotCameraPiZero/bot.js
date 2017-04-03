var authorized_users = [
  111111, //replace with your id
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
  token: '####MYTOKEN####' //replace with your token
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
   if(!isAuthorized(message.from.id)) 
	   return;
   
    var date = new Date()+"";
   switch(message.text){	  
	 case "/photo":    
	    bot.sendPhoto({
        chat_id : message.chat.id,
        caption: date,
	    files: {
			 photo: '/home/pi/Desktop/bot/currentPhoto.jpg'   
       }
      });
	  break;
	  case "/video":
	  
	   
   }
 
   

}


// Function that checks if the user is authorized (its id is in the array)
function isAuthorized(userid) {

  for(i = 0; i < authorized_users.length; i++) 
    if(authorized_users[i ] == userid) return true;
 
  return false;
}

