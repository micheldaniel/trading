//load modules
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
    if (error) {
        console.error(ConsoleColor.error()+error);
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
            var coinTags = marktData[i].Currency;
            console.log(coinTags);
            
            /*
            //quert data
            //SELECT COUNT(*) AS total FROM
            MYSQLConnection.query("SELECT COUNT(cointag) AS total FROM `bigCryptoData`.`coinnamen` WHERE cointag='"+coinTags+"'", function (err, result) {
                if (err) {
                    console.error(ConsoleColor.error()+"Probleem bij opvragen coin tag uit het database.");
                } else {
                    console.log(ConsoleColor.log()+"Er is dat uit het database opgevraagd");
                    console.log(coinTags);
                    //switch
                    switch(result[0].total){
                        case 1:
                            console.log(result[0].total);

                            //update data
                            console.log("UPDATE `coinnamen` SET `bittrex`='true' WHERE `cointag`='"+coinTags+"'");
                            MYSQLConnection.query("UPDATE `bigCryptoData`.`coinnamen` SET `bittrex`='true' WHERE `coinID`="+coinTags, function (err, result) {
                                if (err) {
                                    console.error(ConsoleColor.error()+"Bij coinnamen table kan kan de coin status niet worden geupdate.");
                                } else {
                                    console.log(ConsoleColor.log()+"Er is data in het database gezet.");
                                }
                            });
                            
                            break
                        default: 
                        break
                    }
                }
            })*/
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