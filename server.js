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


app.post('/api/addSession', (req, res) => {
	console.log("here")
	var session = req.body;
	console.log(session)
	let connection = mysql.createConnection(config);
	let sql = 'INSERT INTO sessions (sport, location, level, max_players, session_description, date_and_time) VALUES ?';
	var values = [Object.values(session.data)];
	console.log(values);
	connection.query(sql, [values], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		res.send({ express: results });
	});
	connection.end();
});

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
app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
