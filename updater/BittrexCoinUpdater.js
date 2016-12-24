//load modues
var request = require('request');
var fs = require('fs');
 
var options = {
  url: 'https://bittrex.com/api/v1.1/public/getcurrencies',
  headers: {
    'User-Agent': 'request'
  }
};

//load require
var ConsoleColor = require('../ConsoleColor.js');
 
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {

        //json
        var memoryCoinTags = [];
        var data = JSON.parse(body).result;

        for (i = 0; i < data.length; i++) {
            
            //push data
            memoryCoinTags.push(data[i].Currency);
        }
        
        //write data
        fs.writeFileSync('./files/coinBittrex.json', JSON.stringify(memoryCoinTags));
    }
}
 
request(options, callback);