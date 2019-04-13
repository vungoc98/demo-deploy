//Install express server
const express = require('express');
const jsonParser = require("body-parser").json();
const path = require('path');
const mysql = require('mysql');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/demo-deploy'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/demo-deploy/index.html'));
});

 
// Ket noi nodejs voi mysql
var con = mysql.createConnection({
	database: 'sql12287863',
	host:  'sql12.freemysqlhosting.net',
	user: 'sql12287863',
	password: 'cQ4ERTAMTQ'
});

con.connect(function(err) {
	if (err) {
		console.log('error');
	}
	else 
		console.log("Connected");
}); 
class Login {
	constructor(check, username, password, name, address, email, mobile, acount_type) {
		this.check = check; // kiem tra thong tin tai khoan dang nhap dung hay sai (1: dung, 0: sai)
		this.username = username;
		this.password = password;
		this.name = name;
		this.address = address;
		this.email = email;
		this.mobile = mobile;
		this.acount_type = acount_type;
	}
}
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);
// Xu ly thong tin dang nhap
app.post('/login', jsonParser, (req, res) => {
	var sql = "select * from user1 where username = ? and password = ?";
	
	sql = mysql.format(sql, [req.body.name, req.body.password]);
	 
	con.query(sql, function(err, results) {
		if (err) throw err; 
		if (results.length == 0) {
			this.login = new Login(check = 0);
		}
		for (var i = 0; i < results.length; i++) {
			this.login = new Login(1, results[i].username, results[i].password, results[i].name, results[i].address, results[i].email, results[i].mobile, results[i].acount_type);	 
		}
		res.send(this.login);
	})
   
});
// Lay thong tin tai khoan khi nguoi dung reload lai page
app.post('/getAcountInfo', jsonParser, (req, res) => {
	var sql = "select * from user1 where username = ?";
	
	sql = mysql.format(sql, [req.body.username]);
	 
	con.query(sql, function(err, results) {
		if (err) throw err; 
		if (results.length == 0) {
			this.login = new Login(check = 0);
		}
		for (var i = 0; i < results.length; i++) {
			this.login = new Login(1, results[i].username, results[i].password, results[i].name, results[i].address, results[i].email, results[i].mobile, results[i].acount_type);	 
		} 
		 
		res.send(this.login);
	})
})