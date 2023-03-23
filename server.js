let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

//Select email,password where email=(?) AND password=(?);

app.post('/api/getSessions', (req, res) => {
	let connection = mysql.createConnection(config);
	let sql = "SELECT * FROM sessions";
	connection.query(sql, function (err, result, fields) {
		if (err) throw err;
		res.send({ results: result });
	});
	connection.end();
});

app.post('/api/getUserSessions', (req, res) => {
	let connection = mysql.createConnection(config);
	let sql = "SELECT U.first_name, U.last_name, U.user_id, U.user_email, US.session_id FROM users U, user_sessions US WHERE U.user_id = US.user_id;";
	connection.query(sql, function (err, result, fields) {
		if (err) throw err;
		res.send({ results: result });
	});
	connection.end();
});

app.post('/api/getInfo', (req, res) => {
	console.log("getting info")
	var info = req.body;
	console.log(info);
	console.log(info.email);
	let connection = mysql.createConnection(config);
	let sql = 'SELECT * FROM users WHERE user_email = ? AND user_password = ? ;'
	// let sql = 'SELECT * FROM users WHERE user_email = \''+JSON.stringify(req.body.email)+'\' AND user_password = \''+JSON.stringify(req.body.password)+'\';';
	var values = [info.data.email, info.data.password];
	console.log(values);

	connection.query(sql, values, function (error, result, fields) {
		console.log(sql);
		if (error) {
			console.error(error.message);
			return { status: "fail" };
		}

		res.send({ results: result });
	});
	connection.end();
});

app.post('/api/addSession', (req, res) => {
	var session = req.body;
	var sessionID = 0;
	let connection = mysql.createConnection(config);
	let sql = 'INSERT INTO sessions (sport, location, level, max_players, session_description, date_and_time) VALUES ?';
	var values = [Object.values(session.data)];
	console.log(values);
	connection.query(sql, [values], (error, results, fields) => {
		if (error) {
			console.error(error.message);
			return { status: "fail" };
		}
	});

	let someQuery = 'SELECT session_id FROM sessions WHERE sport = ' + JSON.stringify(session.data.sport) + ' AND location = ' + JSON.stringify(session.data.location) + ' AND level = ' + JSON.stringify(session.data.level) + ' AND max_players = ' + JSON.stringify(session.data.maxPlayers) + ' AND session_description = ' + JSON.stringify(session.data.description) + ' AND date_and_time = ' + JSON.stringify(session.data.date) +';'
	connection.query(someQuery, (error, results, fields) => {
		if (error) {
			console.error(error.message);
			return { status: "fail" };
		}
		sessionID = results;
		res.send({ status: "pass", sessionID: sessionID });
	});
	
	connection.end();
});

app.post('/api/addSessionUser', (req, res) => {
	var request = req.body;
	var sessionID = request.sessionID[0].session_id;
	var profileID = request.profileID.user_id;
	let sql = 'INSERT INTO user_sessions (session_id, user_id) VALUES ?';
	let connection = mysql.createConnection(config);
	connection.query(sql, [[[sessionID, profileID]]], (error, results, fields) => {
		if (error) {
			console.error(error.message);
			return { status: "fail" };
		}
		res.send({ status: "pass"});
	});

});


//let postUserSession = 'INSERT INTO user_sessions (user_id, session_id) VALUES ?'
app.post('/api/SignUp', (req, res) => {
	console.log("here")
	var signUp = req.body;
	console.log(signUp)
	let connection = mysql.createConnection(config);
	let sql = 'INSERT INTO users (first_name, last_name, user_email, user_password, user_gender) VALUES ?';
	var values = [Object.values(signUp.data)];
	console.log(values);
	connection.query(sql, [values], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		res.send({ express: results });
	});
	connection.end();
});

app.post('/api/joinSession', (req, res) => {
	var session = req.body;
	
	let connection = mysql.createConnection(config);
	let sql = 'INSERT INTO user_sessions (session_id, user_id) VALUES ?';
	var values = [Object.values(session.data)];
	console.log(values);
	connection.query(sql, [values], (error, results, fields) => {
		if (error) {
			console.error(error.message);
			return { status: "fail" };
		}
		res.send({ status: "pass"});
	});
	connection.end();
});

app.post('/api/getUpcomingSessions', (req, res) => {
		var session = req.body;
		var data = session.data;
		var today = new Date();
		let sql = "SELECT S.sport, S.level, S.date_and_time, S.location, S.max_players, S.session_description, S.session_id FROM sessions S, user_sessions US WHERE US.user_id =  " + JSON.stringify(data.user_id) + " AND S.session_id = US.session_id AND S.date_and_time > " + " '" + today.toLocaleDateString("en-US") + "' ORDER BY S.date_and_time DESC";;
		
		console.log(sql);
		let connection = mysql.createConnection(config);
		connection.query(sql, function(err, result, fields) {
			if (err) throw err;
			res.send({ results: result})
		})
		connection.end();
});


app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
