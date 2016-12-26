//load modules
var async = require('async');
var request = require('request');
var fs = require('fs');
var mysql = require('mysql');

//load require
var ConsoleColor = require('../ConsoleColor.js');

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
  url: 'https://bittrex.com/api/v1.1/public/getcurrencies',
  headers: {
    'User-Agent': 'request'
  }
};
 
//callback
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        
        //async series
        async.series([
            function(callback) {
                
                //connectie maken met mysql
                MYSQLConnection.connect(function(err){
                    if(err){
                        console.error(ConsoleColor.error()+err);
                    } else {
                        console.log(ConsoleColor.log()+"Connectie met mysql.");
                    }
                });
                
                callback();
            },
            function(callback) {
                var marktData = JSON.parse(body).result;
                
                var i = 0;
                while (marktData[i]) {
                    
                    var Currency = marktData[i].Currency;
                    var query = "UPDATE `bigCryptoData`.`coinnamen` SET `bittrex`='true' WHERE `cointag`='"+Currency+"'";
                    MYSQLConnection.query(query, function (err, result) {
                        if (err) {
                            console.error(ConsoleColor.error()+"Probleem bij opvragen coin tag uit het database.");
                        } else {
                            console.log(result[0].Rows matched);
                            console.log(ConsoleColor.log()+"Er is data in het database gezet.");
                            console.log(result);
                            
                        }
                    });
                    
                    //count +1
                    i++;
                };
                
                callback();
            },
            function(callback) {
                MYSQLDISCONNECT();
            }
        ]);
        
        
        //connectie met mysql sluiten
        //MYSQLDISCONNECT();
        //MYSQLDISCONNECT
        function MYSQLDISCONNECT (){
            MYSQLConnection.end(function(err){
                if(err){
                    console.error(ConsoleColor.error()+"Kan mysql connentie niet opsluiten..");
                } else {
                    console.log(ConsoleColor.log()+"Mysql connectie is afgesloten.");
                };
            });
        };
    }
}
request(options, callback);
//UPDATE  bigcryptodata.coinnamen SET bittrex='true' WHERE cointag='LTC';