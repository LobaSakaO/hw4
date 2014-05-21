var cheerio = require('cheerio');
var request = require('request');

var appleUrl = 'http://www.appledaily.com.tw/realtimenews/section/new/';

var newsList;
var tmp_cate = {"category":"", "news_count":0, "news":[]};
var tmp_news = {"title":"", "url":"", "time":"", "video":""};
var allCategory = ['動物','FUN','瘋啥','搜奇','正妹','體育','臉團','娛樂','時尚','生活','社會','國際','財經','地產','政治','論壇'];
var output = {};
allCategory.forEach(function(cate, index, array){
	var tmp_c = tmp_cate;
	tmp_c['category'] = cate;
	output[cate] = tmp_c;
});
console.log(output);

request.get(appleUrl+'1', function(err, res, html){
	if (!err && res.statusCode == 200) {
    var $ = cheerio.load(html);
    newsList = $("#maincontent div.abdominis > ul.rtddd.slvl > li.rtddt");

    newsList.each(function(){
    	var theCate = $(this).find("h2").text();
    	var theTitle = $(this).find("h1 > font").text();
    	var theTime = $(this).find("time").text();
    	// var theUrl = $(this).find("a").href();

    	var tmp_n = tmp_news;
    	tmp_n['title'] = theTitle;

    	output[theCate]['news'] = tmp_n;
    	console.log(output["動物"]);
    });

    // mainUl.find("li .rtddd").each(function(){
    // 	console.log($(this).attr());
    // });
  }
});

