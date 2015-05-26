
//библиотека необходимая для прогона тестов
var request = require('request');
//JSON файл с массивом ссылок которые нужно проверить
var jsonWithLinks = require('./jsonWithLinks.json');

var async = require('async')

console.log('jsonWithLinks.json', jsonWithLinks);
//результирующий массив будет тут
var linksWithCode = [];
for (var i = 0; i < jsonWithLinks.links.length; i++ ) {
	//асинхронные запросы. поехали
	request({
		url:jsonWithLinks.links[i],
		followRedirect : false
		}, function  (err, response) {
			console.log('jsonWithLinks', JSON.stringify(response.request.uri.href, null, '\t'), ' : ', response.statusCode);
			// console.log('response', response.statusCode);

			//если 301 статус - заполняем массив
			if(response.statusCode === 301) {
				console.log('301+ ');
				linksWithCode.push(response.request.uri.href);
			}
		})
	//в цикле

}
	// console.log('result', linksWithCode );