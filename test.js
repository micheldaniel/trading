//load modules
var request = require('request');
var fs = require('fs');
var mysql = require('mysql');

//load require
var ConsoleColor = require('./ConsoleColor.js');

//config
var config = JSON.parse(fs.readFileSync("./config.json"));
console.log(config);
//connection
/*
var MYSQLConnection = mysql.createConnection({
  host     : config.mysql.host,
  user     : config.mysql.user,
  password : config.mysql.wachtwoord,
  database : "bigCryptoData"
});*/
/*
var MYSQLConnection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "Pulsar11",
  database : "bigCryptoData"
});

//options
var options = {
  url: 'https://api.coinmarketcap.com/v1/ticker/?limit=150',
  headers: {
    'User-Agent': 'request'
  }
};
 
//callback
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var result = JSON.parse(body);
            MYSQLConnection.connect(function(err){
                if(err){
                    console.error(ConsoleColor.error()+"Kan geen connectie maken met mysql.");
                } else {
                    console.log(ConsoleColor.log()+"Connectie met mysql.");
                }
            });
        
        
        MYSQLConnection.query('SELECT * from coinnamen', function(err, rows, fields) {
            if (err) throw err;

            console.log(rows);
        });
        
    }
}
 
request(options, callback);

      //   String INSERTINFOQuary = "INSERT INTO `corendonbagagesystem`.`gevondenbagage` (`bagagelabel`, `kleur`, `dikte`, `lengte`, `breedte`, `luchthavengevonden`, `datum`, `bijzonderhede`)"+
        //                    "VALUES ('"+InputBagageNummer.getText()+"','"+kofferKleur+"', '"+dikteKoffer+"', '"+lengteKoffer+"', '"+breedteKoffer+"', '"+locatieKoffer+"', CURDATE(), '"+Bijzonderheden.getText()+"')";
              */

var data = JSON.parse(fs.readFileSync('./files/lol.json'));
console.log(data);
console.log(data["name"]);