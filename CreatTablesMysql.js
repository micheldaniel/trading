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
  url: 'https://api.coinmarketcap.com/v1/ticker/?limit=150',
  headers: {
    'User-Agent': 'request'
  }
};
 
//callback
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        
        //creat memory
        var coinTagsMemory = [];
        
        //json.parse
        var result = JSON.parse(body);
        
        //connectie met mysql
        MYSQLConnection.connect(function(err){
            if(err){
                console.error(ConsoleColor.error()+err);
            } else {
                console.log(ConsoleColor.log()+"Connectie met mysql.");
            }
        });
        
        //for loop
        for (i = 0; i < result.length; i++) {
            
            //coinTag
            var coinTag = result[i].symbol;
            coinTagsMemory.push(coinTag);
            
            //intersect data
            var insertQuery = "INSERT INTO `coinnamen` (`cointag`, `coinnaam`, `rank`, `updatedatum`)"+
                "VALUES('"+result[i].symbol+"','"+result[i].name+"','"+result[i].rank+"', CURDATE())";
            
            //query uitvoeren
            MYSQLConnection.query(insertQuery, function (err, result) {
                if (err) {
                    console.log(ConsoleColor.error()+err);
                } else if(result){
                    console.log(ConsoleColor.log()+"Data opgeslagen in database.");
                }
            });
        }
        
        //write file
        fs.writeFileSync('./files/coinTags.json', JSON.stringify(coinTagsMemory));

        //close mysql connecion
        MYSQLConnection.end(function(err){
            if(err){
                console.error(ConsoleColor.error()+err);
            } else {
                console.log(ConsoleColor.log()+"Mysql connectie is afgesloten.");
            };
        });
    }
}
 
//start add cointags in table
request(options, callback);