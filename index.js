// dependencies
var restify = require('restify');
var builder = require('botbuilder');
var natural = require('natural');
var request = require('request');
var oncotype = false;
var CIN = false;
var HPV = false;
var Colposcopy=false;
var Biopsy = false;
var Cytology = false;
var Schiller=false;

// Global Array
var record = ""

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// create the bot
var bot = new builder.UniversalBot(connector);

// Listen for messages from users
server.post('/diseasebot', connector.listen());

// var bot = new builder.UniversalBot(connector, [function(session){
//       // Echo back users text
//       var msg = "Would you like to now if you might have a diabetes disease, lung cancer or cervical cancer? Respond with 'diabetes', 'lung' or 'cervical' please";
//       session.send(msg);
// }]);
var bot = new builder.UniversalBot(connector, {
    storage: new builder.MemoryBotStorage(),
    function(session){
        builder.Prompts.text(session, 'What is your name?');
    },
    function(session,results){
        if(results.response){
          session.endConversation('Hello, %s', results.response);
        }
    }
});
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/bd0e8c3f-9a91-4f2a-8086-fdbfc05cc4b2?subscription-key=3c1c88e0cd3842a8819a2b92a2921543&timezoneOffset=0.0&verbose=true&q=';

var recognizer = new builder.LuisRecognizer(model);
bot.recognizer(recognizer);

 
 



bot.dialog('lung', [
 function (session, results){
       
     
        builder.Prompts.text(session, "Please, tell me your age: ");
        },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "What's your 'sex':Male|Female(1|2)");
        },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,   "On a scale of 1-10 how exposed are you to air pollution");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "On a scale of 1-10 how much do you take alcohol? ");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "On a scale of 1-10 how would you grade your dust allergy levels");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,  "On a scale of 1-10 how  exposed are you to occupational hazards");
    },
   
    
    
    
    
   
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,  "On a scale of 1-10 how  exposed are you to genetic risk");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,  "On a scale of 1-10 have you been treated for chronic lung disease in the past");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,  "On a scale of 1-10 how can you rate your balanced diet");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,  "On a scale of 1-10 how  exposed are you to obesity");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,   "On a scale of 1-10 how much do you smoke");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,  "On a scale of 1-10 how would you grade if your are a passive smoker");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,  "On a scale of 1-10 how  would you grade if you have a chest pain");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,  "On a scale of 1-10 how   would you grade if you have coughing of blood");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,  "On a scale of 1-10 how  are you have fatigue");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "On a scale of 1-10 how  exposed are you weight loss");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,   "On a scale of 1-10 how  exposed are you shortness_of_breath",);
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,    "On a scale of 1-10 how  exposed are you wheezing");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,   "On a scale of 1-10 how  exposed are you swallowing_difficulty");
    },
  
   
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,  "On a scale of 1-10 how  exposed are you clubbing_of_finger_nails");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "On a scale of 1-10 how  exposed are you frequent_cold");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,   "On a scale of 1-10 how  exposed are you dry_cough");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session,   "On a scale of 1-10 how  exposed are you snoring");
    },
   
    function(session,results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput
        
        request.post({
            url: 'http://127.0.0.1:5000/predictLung',     //changed here to predict diabetes
            body: record
     }, function (r1, r2) {
           response_value = r2.body;

           session.endDialog("RESPONSE: "+response_value);

           record ="";

           session.endDialog('End dialog.');
     })
   }

]).triggerAction({
    matches: /^lung$/i
});
