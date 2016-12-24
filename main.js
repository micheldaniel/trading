//load modules
var express = require('express');
var fs = require('fs');

//app
var app = express();

//load codes
var ConsoleColor = require('./ConsoleColor.js');

//dirname
var dirname = __dirname;

//creat AufoConfig.json
function AutoConfig (){
  
    //jsonString
    var jsonString = ({
        fileLocation: dirname
    });
    
    //write file
    fs.writeFile(dirname+'/AutoConfig.json', JSON.stringify(jsonString), function(err){
        if(err){
            console.error(ConsoleColor.error()+"Er is een bij AutoConfig.json op te slaan.");
        } else {
            console.log(ConsoleColor.log()+"AutoConfig.json is opgeslagen.");
        }
    });
    
};

//Run AutoConfig funtion
//AutoConfig();

//start server
app.listen(9090, function(){
   console.log(ConsoleColor.log()+"Server is aan.");
});