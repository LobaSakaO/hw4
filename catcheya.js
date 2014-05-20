var cheerio = require('cheerio');
var request = require('request');

var appleUrl = 'http://www.appledaily.com.tw/realtimenews/section/new/';

var newsList;
var 

request.get(appleUrl+'1', function(err, res, html){
	if (!err && res.statusCode == 200) {
    var $ = cheerio.load(html);
    newsList = $("#maincontent div.abdominis > ul.rtddd.slvl > li.rtddt");

    newsList.each(function(){
    	if($(this).hasClass("life")) console.log($(this).find("font").text());
    });

    // mainUl.find("li .rtddd").each(function(){
    // 	console.log($(this).attr());
    // });
  }
});

