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
        
        var coinTagMemoryDB = {};
        var totalMemoryDB= {};
        
        //MarktData
        var marktData = JSON.parse(body).result;
        
        //for loop
        for (i = 0; i < marktData.length; i++) { 
            
            var tradeMarket = marktData[i].MarketName;
            
            //if loop
            if(tradeMarket.substring(0,4) == "BTC-"){
                
                //get cointags
                var coinTag = tradeMarket.substring(4);
                coinTagMemoryDB[coinTag] = 'true';
            }
        }
        
        //loop om alle data om te zetten naar makkelijker sorteer moment
        for (i = 0; i < marktData.length; i++) { 
            
            //trade market
            var tradeMarket = marktData[i].MarketName;
            
            //if loop
            if(tradeMarket.substring(0,4) == "BTC-"){
                
                //get cointags
                var coinTag = tradeMarket.substring(4);
                
                //get alle data
                var data = JSON.stringify({
                    'High': marktData[i].High,
                    'Low': marktData[i].Low,
                    'Volume': marktData[i].Volume,
                    'Bid': marktData[i].Bid,
                    'ask': marktData[i].Ask,
                    'OpenBuyOrders': marktData[i].OpenBuyOrders,
                    'OpenSellOrders': marktData[i].OpenSellOrders
                });
                
                totalMemoryDB[coinTag] = data;
            }
        }
        
        console.log(totalMemoryDB);
        fs.writeFile("./files/bittrexCoinMarketData",JSON.stringify(totalMemoryDB));
    }
}

//reuqest
request(options, callback);



/*
{ MarketName: 'BTC-MTR',
    High: 0.00000117,
    Low: 0.00000117,
    Volume: 4270,
    Last: 0.00000117,
    BaseVolume: 0.0049959,
    TimeStamp: '2016-12-31T00:02:37.227',
    Bid: 0.00000113,
    Ask: 0.00000119,
    OpenBuyOrders: 69,
    OpenSellOrders: 701,
    PrevDay: 0.00000117,
    Created: '2015-03-07T19:20:50.303' },
*/