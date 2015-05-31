var mysql      = require('mysql'); //cвязь с базой
var request = require('request'); //либа для реквестов

////////////////////////////!!!!!!!!!!!!!!!!!!////////////////////////////////
////////////////////////////******************////////////////////////////////
////////////////////////////Не оптимизировано!////////////////////////////////
////////////////////////////******************////////////////////////////////
////////////////////////////!!!!!!!!!!!!!!!!!!////////////////////////////////

//научусь работать с SQL - перепишу. Или нет.

//////////////////////////////////////
//Не забудь создать папку node_modules в корне проекта и есесн npm install
//воткни свои данные для подключения к базе

// drink4427 // drink4860
var connection = mysql.createConnection({
  host     	: 'localhost', //сервер
  user     	: 'root', 		//логин база
  password 	: 'throughglass', //пароль база
  port 		: 3306, 			//порт
  database 	: 'links' 			//имя базы
});
//количество записей в базе
var COUNTER;
//инициируем соединение
connection.connect();
//инициируем запрос к базе для определения количества записей
connection.query('SELECT id FROM pages ORDER BY id DESC LIMIT 1', function(err,res) {
	//после получения ответа инициализация счетчика
	COUNTER = res[0].id;
	console.log('COUNTER:', COUNTER);
	// главный цикл
	for(var i = 10780; i < COUNTER; i++) {
		//собираем строку запроса для базы
		var idString = 'id=' + i;
		var connStr = 'SELECT pages.id, pages.hostname, pages.page FROM pages WHERE ' + idString + ';';
		//создаем запрос на основе айдишника (перебираются тупо от 0 до COUNTER)
		connection.query(connStr, function(err, rows, fields) {
			if (err) {
				throw err
			}
			else  if(rows && rows[0].page){
				//Получили из базы 1 запись и собираем строку uri для реквеста на сервер
				// Логин-пароль всегда одинаковые. Меняется только то, что в базе валяется в столбце page
				//собираем строку
				var endString=  'http://dmixer:dmixerpassword1@dmixer-staging.elasticbeanstalk.com' + rows[0].page;
				//пуляем реквест на сервер. Привет библиотеке request
				request({
					url: endString,			//наш собранный uri
					followRedirect : false 	// параметр кагбе намекает, что переходить по редиректу не стоит, а вот статус получить - стоит.
				}, function  (err, response) {
					if(err) {
						console.log('err');
					} else {
						//в случае успешного запроса, получили ответ и из ответа собираем новую строку запроса к базе
						var stringToUpdate = 'UPDATE pages SET resp_status=' + response.statusCode +' WHERE ' + "page='" + response.request.uri.pathname + "'";
						//Обновить страницы цифиркой статуса (301 например), поиск страницы по полю page (example '/drink182.html')
						connection.query( stringToUpdate, function(err, updated) {
							if(err) {
								console.log('err');
							} else {
								console.log('updated ID:' + i + ' : ' + stringToUpdate + 'statusCode' + response.statusCode);
							}
						})
					}
				});

		  	} else {
		  		console.log('ERROR! ROWS UNDEFINED! check query to DB');
		  	}
		});

	}

})
