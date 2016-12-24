//load modules
var request = require('request');
var fs = require('fs');
var mysql = require('mysql');

//load require
var ConsoleColor = require('./ConsoleColor.js');

//config
var config = JSON.parse(fs.readFileSync("./config.json"));

//connection
var MYSQLConnection = mysql.createConnection({
  host     : config.mysql.host,
  user     : config.mysql.user,
  password : config.mysql.password,
  database : config.mysql.DBName
});

//options
var options = {
  url: 'https://bittrex.com/api/v1.1/public/getmarketsummaries',
  headers: {
    'User-Agent': 'request'
  }
};
 
//callback
function callback(error, response,body) {
    if (error) {
        console.error(ConsoleColor.error()+"Probleem bij opvragen markt data van bittrex.");
    } else {
        var marktData = JSON.parse(body).result;

        //connectie met mysql
        MYSQLConnection.connect(function(err){
            if(err){
                console.error(ConsoleColor.error()+err);
            } else {
                console.log(ConsoleColor.log()+"Connectie met mysql.");
            }
        });        
        
        //for loop
        for (i = 0; i < marktData.length; i++) {
            
            //varaialbe
            var coinTags = marktData[i].Market;
            
            //intersect data
            MYSQLConnection.query('DELETE FROM posts WHERE title = "wrong"', function (err, result) {
                if (err) {
                    console.error(ConsoleColor.error()+"Kan geen data in het databse zetten.");
                } else {
                    console.log(ConsoleColor.log()+"Bittrex market data is opgeslagen van coin "+coinTags+'.');
                }
            });
        }
        
        //close mysql connecion
        MYSQLConnection.end(function(err){
            if(err){
                console.error(ConsoleColor.error()+"Kan mysql connentie niet opsluiten..");
            } else {
                console.log(ConsoleColor.log()+"Mysql connectie is afgesloten.");
            };
        });
    }
}
 
request(options, callback);