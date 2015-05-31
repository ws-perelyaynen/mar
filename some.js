var mysql      = require('mysql');
var request = require('request');

// drink4427
var connection = mysql.createConnection({
  host     	: 'localhost',
  user     	: 'root',
  password 	: 'throughglass',
  port 		: 3306,
  database 	: 'links'
});
var COUNTER;
connection.connect();
connection.query('SELECT id FROM pages ORDER BY id DESC LIMIT 1', function(err,res) {
	COUNTER = res[0].id;
	console.log('COUNTER:', COUNTER);
	for(var i = 1641; i < COUNTER; i++) {
		var idString = 'id=' + i;
		var connStr = 'SELECT pages.id, pages.hostname, pages.page FROM pages WHERE ' + idString + ';';
		// console.log('connStr', connStr);
		connection.query(connStr, function(err, rows, fields) {
			// console.log(rows);
			if (err) {
				throw err
			}
			else  if(rows && rows[0].page){
				var endString=  'http://dmixer:dmixerpassword1@dmixer-staging.elasticbeanstalk.com' + rows[0].page;
				request({
					// url: exampleString,
					url: endString,
					followRedirect : false
				}, function  (err, response) {
					// console.log('response', JSON.stringify(response.request.uri.pathname, false, 2));
					if(err) {
						console.log('err');
					}else {
						// console.log(response.statusCode);
						var stringToUpdate = "page='" + response.request.uri.pathname + "'";
						// console.log('adsfasdf', stringToUpdate);
						connection.query('UPDATE pages SET resp_status=' + response.statusCode +' WHERE ' + stringToUpdate, function(err, updated) {
							if(err) {
								console.log('err');
							} else {
								console.log('updated ID:' + i + ' : ' + stringToUpdate + 'statusCode' + response.statusCode);
							}
						})
					}
				});

		  	} else {
		  		// console.log(idString + ' has no property');
		  	}
		});

	}

})
// return;


  // var exampleString = 'http://dmixer:dmixerpassword1@dmixer-staging.elasticbeanstalk.com/desc240.html'


// connection.end();

/////////////////////////////////////////////////

//библиотека необходимая для прогона тестов







//асинхронные запросы. поехали
// request({
// 	url:jsonWithLinks.links[i],
// 	followRedirect : false
// 	}, function  (err, response) {
// 		// console.log('jsonWithLinks', JSON.stringify(response.request.uri.href, null, '\t'), ' : ', response.statusCode);

// 		//если 301 статус - заполняем массив
// 		if(response.statusCode === 301) {
// 			console.log('301+ ');
// 			linksWithCode.push(response.request.uri.href);
// 		}
// 	})













///////////////////////////////////////////////////






// connection.query('SELECT * FROM pages;', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows);
// });

// connection.end();