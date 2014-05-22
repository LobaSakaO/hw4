var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

const appleUrl = 'http://www.appledaily.com.tw/realtimenews/section/new/';

var latestDate;

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
});

var doneNum = 0;
request.get(appleUrl+1, function(err, res, html){
    if (!err && res.statusCode == 200) {
        var $ = cheerio.load(html);
        latestDate = $("#maincontent div.abdominis > h1.dddd > time").text();
        console.log('aa',latestDate);
        doneNum += 1;
    }
    else
    {
        console.log('request failed');
    }
});


for (var page = 1; page<=5; page++)
{
    console.log('page is', page);
    request.get(appleUrl+page, function(err, res, html){
    	if (!err && res.statusCode == 200) {

            var $ = cheerio.load(html);
            var newsList = $("#maincontent div.abdominis > ul.rtddd.slvl > li.rtddt");

            newsList.each(function(){
            	var theCate = $(this).find("h2").text();
            	var theTitle = $(this).find("h1 > font").text();
            	var theTime = $(this).find("time").text();
                var theUrl = $(this).find("a").attr('href');
                var hasVideo = $(this).hasClass('hsv');

            	output[theCate]['news'].push(new tmp_news(theTitle, theUrl, theTime, hasVideo));

            });
            doneNum += 1;
        }

    });

}

while(doneNum < 6)
{
    console.log(doneNum);
}

for (var cate in output){
    output[cate]['news_count'] = output[cate]['news'].length;
}
var maxNews = '';
var maxNewsCount = 0;
for (var cate in output){
    if (output[cate]['news_count'] > maxNewsCount)
    {
        maxNewsCount = output[cate]['news_count'];
        maxNews = output[cate]['category'];
    }
}

console.log(JSON.stringify(output, null, 4));
console.log(latestDate.text() + " - 新聞數量最多的分類為[" + maxNews + "], 共有" + maxNewsCount + "則新聞");


