//Load color module
var colors = require('colors');
 
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'blue',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

function date(){
    var date = new Date();
    
    //maand
    if ((date.getMonth() + 1) < 9){
        var maand = "0"+date.getMonth()+1;
    } else {
        var maand = (date.getMonth() + 1);
    }
    
    //dag
    if (date.getDate() < 9){
        var dag = "0"+date.getDate();
    } else {
        var dag = date.getDate();
    }
    
    //uur
    if (date.getHours()  < 9){
        var uur = "0"+date.getHours();
    } else {
        var uur = date.getHours();
    }
    
    //minut
    if (date.getMinutes()  < 9){
        var minut = "0"+date.getMinutes();
    } else {
        var minut = date.getMinutes();
    }
    
    //sec
    if (date.getSeconds()  < 9){
        var sec = "0"+date.getSeconds();
    } else {
        var sec = date.getSeconds();
    }    
    
    var str = "["+date.getFullYear() + "-" + maand + "-" + dag + " " +  uur + ":" + minut + ":" + sec+"] [INFO] ";
    return str;   
}

module.exports = {
    
    //error
    error: function(){
        return date().error +" [ERROR] ";
    },  
    //log
    log: function(){
        return date().info+ ' [INFO] ';
    },
    
    warn: function(){
        return  date().warn+" [WARN] ";
    }
};