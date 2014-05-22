var cheerio = require('cheerio');
var request = require('request');

const appleUrl = 'http://www.appledaily.com.tw/realtimenews/section/new/';

var newsList;

function tmp_cate(category){
    return {"category":category, "news_count":0, "news":[]};
}
function tmp_news(title, url, time, video){
    return {"title":title, "url":url, "time":time, "video":video};
}

const allCategory = ['動物','FUN','瘋啥','搜奇','正妹','體育','臉團','娛樂','時尚','生活','社會','國際','財經','地產','政治','論壇'];
var output = {};

allCategory.forEach(function(element, index, array){
	output[element] = new tmp_cate(element);
    console.log(output);
});

request.get(appleUrl+'1', function(err, res, html){
	if (!err && res.statusCode == 200) {

        var $ = cheerio.load(html);
        newsList = $("#maincontent div.abdominis > ul.rtddd.slvl > li.rtddt");

        newsList.each(function(){
        	var theCate = $(this).find("h2").text();
        	var theTitle = $(this).find("h1 > font").text();
        	var theTime = $(this).find("time").text();
        	// var theUrl = $(this).find("a").href();


        	output[theCate]['news'].push(new tmp_news(theTitle, '', theTime, false));

        });

        console.log(output);
        console.log(JSON.stringify(output), null, 4);

    }
});

