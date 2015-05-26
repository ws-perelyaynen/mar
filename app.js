// console.log('HELLOWORLD')
// // console.log(process.argv);
// var sum = 0;
// // console.log("proc.argv2" + Number(process.argv[2]));
// for(var i = 2; i < process.argv.length; i++) {
// 	// console.log(Number(process.argv[i]) );
// 	sum = sum + Number(process.argv[i]);
// 	// console.log("sum=" +sum);
// }
// 	console.log(sum );

var fs = require('fs');
require('colors');
var path = require('path');

// //task3 start NOT PASSED
// var testFile = fs.readFileSync('235');
// var testBuffer = new Buffer(testFile).toString();
// var countAllNewLines = 0;
// var splittedString = testBuffer.split('\n');
// console.log( splittedString.length);

// // console.log('buffer is'.red, testBuffer)
// //task3 end

// // task 4 start
// var givenFilename = process.argv[2];
// var incoding = 'utf8'
// // var testBuffer = new Buffer(givenFilename).toString();
// var testFile = fs.readFile(givenFilename, incoding, function(err, data, incoding) {
// 	if(err) {
// 		console.error('Read file error Check the name'.blue, err);
// 	} else {
// 		var splittedString = data.split('\n');
// 		console.log(splittedString.length-1)
// 	}
// })
// // task 4 end


// task 5 start
	// var givenDirname = process.argv[2];
	// var givenExtension = process.argv[3];

	// // console.log('folder is', fs.readdir(givenDirname ))

	// var testDir = fs.readdir(givenDirname, function(err, list) {
	// 	if (err) {
	// 		console.error("Error of filename. Check ", err)
	// 	}
	// 	else {
	// 		// console.log(list);
	// 		var counter = 0;
	// 		for(var i =0; i < list.length; i++) {
	// 			fileName = list[i];
	// 			// console.log('tepath.extname(fileName)st', path.extname(fileName));
	// 			// console.log('givenExtension', givenExtension);
	// 			if(path.extname(fileName) == givenExtension) {
	// 				counter++;
	// 				console.log(fileName);
	// 				// console.log("counter", counter);
	// 			}
	// 		}
	// 		// console.log(counter);
	// 	}
	// });
// fs.readdir(process.argv[2], function (err, list) {
// 	list.forEach(function (file) {
// 		if (path.extname(file) === '.' + process.argv[3])
// 			console.log(file)
// 		})
// })


// task 5 end

//task 7 begin
// var yourUrl = process.argv[2];
// http.get(yourUrl, function(req) {
// 	req.setEncoding("utf8")
// 	req.on("data", function(data) {
// 		console.log(data);
// 	})
// 	// console.log("we have a response " + util.inspect(res) )
// })
//task 7 end

// var list = ['http://www.google.com', 'http://www.vk.com', 'http://dmixer:dmixerpassword1@dmixer-staging.elasticbeanstalk.com/desc240.html']

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