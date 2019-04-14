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
		res.send('error');
		res.end();
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
// Lay nhom nguoi dung
app.get("/getAcount_Type", (req, res) => {
	// var sql = "select distinct acount_type from user1 where acount_type != ?";
	// sql = mysql.format(sql, 'Nhà phân phối');
	// con.query(sql, function(err, results) {
	// 	if (err) throw err;  
	// 	res.send(results);
	// })
	var sql = "select distinct acount_type from user1 where acount_type != ?";
	sql = mysql.format(sql, 'Nhà phân phối');
	con.query(sql, function(err, results) {
		if (err) throw err;   
		this.login = new Login(1, "","", "", "", "", "", results[0].acount_type);	  
		res.send(this.login);
	}) 
})
app.post('/getAcount_Type', jsonParser, (req, res) => {
	var sql = "select distinct acount_type from user1 where acount_type != ?";
	sql = mysql.format(sql, 'Nhà phân phối');
	con.query(sql, function(err, results) {
		if (err) throw err;   
		this.login = new Login(1, "","", "", "", "", "", results[0].acount_type);	  
		res.send(this.login);
	}) 
})

// Dang ky tai khoan
app.post('/register', jsonParser, (req, res) => {
	// kiem tra co trung ten tai khoan? co thong bao loi, khong chen vao co so du lieu
	var sql = "select * from user1 where username = ?"; 
	sql = mysql.format(sql, [req.body.username]);
	
	con.query(sql, function(err, results) {
		if (err) throw err;

		// Trung ten tai khoan => thong bao loi
		if (results.length != 0) {
			this.login = new Login(check = 0);
			res.send(this.login);
		}

		// Chen vao co so du lieu
		else {
			// ngay hien tai => tuong duong voi ngay tao thong tin
			var create_date= (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate());
			// sinh ma code ngau nhien cho nguoi dung
			var rdmCode = "";
		    for( ; rdmCode.length < 6; rdmCode  += Math.random().toString(36).substr(2));
		    var code = rdmCode.substr(0, 6);
			console.log(code);

			sql = "insert into user1(username, password, name, address, email, mobile, acount_type, image, dele, status, code, create_date) value(?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?)";
			sql = mysql.format(sql, [req.body.username, req.body.password, req.body.name, req.body.address, req.body.email, req.body.mobile, req.body.acount_type, req.body.image, 0, 0, code, create_date]);
			
			con.query(sql, function(err, results) {
				if (err) throw err;
				sql = "select * from user1 where username = ? and password = ?"; 
				sql = mysql.format(sql, [req.body.username, req.body.password]);
				con.query(sql, function(err, results) {
					if (err) throw err;  
					this.login = new Login(1, results[0].username, results[0].password, results[0].name, results[0].address, results[0].email, results[0].mobile, results[0].acount_type);	 
					res.send(this.login);
				})
			})
		}
		 
	}) 
})
// I. NHA PHAN PHOI
// 1. He thong san pham
// 1.1. Tao moi san pham

// Lay nhom san pham
app.get('/getProduct_Type', (req, res) => {
	var sql = "select name from product_category";

	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	});
})
// Tao moi san pham
app.post('/createProduct', jsonParser, (req, res) => {
	// ngay hien tai => tuong duong voi ngay tao thong tin
	var create_date= (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate());
	var product_category_id;
	// Tim product_category_id 
	var sql = "select id from product_category where name = ?";
	sql = mysql.format(sql, [req.body.product_type]); 
	con.query(sql, function(err, results) {
		if (err) {
			res.send("0"); 
		}
		product_category_id = results[0].id;
		console.log("id: " + product_category_id);
		// sinh ma code ngau nhien cho san pham
		var rdmCode = "";
	    for( ; rdmCode.length < 6; rdmCode  += Math.random().toString(36).substr(2));
	    var code = "PRODUCT_" + rdmCode.substr(0, 6);

		var sql = "insert into product(code, name, price, description, image, dele, product_category_id, create_date) values(?, ?, ?, ?, ?, ?, ?, ?)";
		sql = mysql.format(sql, [code, req.body.name, req.body.price, req.body.description, req.body.image, 0, product_category_id, create_date]);
		 
		con.query(sql, function(err, results) {
			if (err) {
				res.send("0"); 
			}
			 
			res.send("1");
		})
	}) 
})

// 1.2. Hien thi danh sach san pham

let product = require('./product.js'); // Lop Product
products = new Array(); // Mang chua cac san pham
app.get('/getMenuProduct', (req, res) => {
	products.splice(0, products.length);
	var sql = `select id, code, name, price, description, image, product_category_id, date_format(create_date, '%d-%m-%Y') as create_date, 
	date_format(update_date, '%d-%m-%Y') as update_date from product where dele = 0`;
	con.query(sql, function(err, results) {
		//console.log("r: " + results);
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			products[i] = new product(results[i].id, results[i].code, results[i].name, results[i].price, results[i].description,
				results[i].image, results[i].product_category_id, results[i].create_date, results[i].update_date); 
			//console.log(products);
		}  
		res.send(products);
	})
})
// 1.3. Tim kiem san pham
app.post('/searchProduct', jsonParser, (req, res) => {
	products.splice(0, products.length);
	// console.log(req.body);
	var sql;
	// tim kiem chi theo ten san pham
	if (req.body.name !="" && req.body.code == "" && req.body.product_category_name == "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date 
		from product where name like ? and dele = 0`;
		sql = mysql.format(sql, "%" + req.body.name + "%");
	}
	else if (req.body.name =="" && req.body.code != "" && req.body.product_category_name == "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date 
		from product where code like ? and dele = 0`;
		sql = mysql.format(sql, "%" + req.body.code + "%");
	}
	else if (req.body.name =="" && req.body.code == "" && req.body.product_category_name != "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date 
		 from product, product_category where product_category_id = product_category.id and product_category.name = ? and product.dele = 0`;
		sql = mysql.format(sql, req.body.product_category_name);
	}
	// tim kiem theo 2 thu
	else if (req.body.name !="" && req.body.code != "" && req.body.product_category_name == "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date 
		 from product where name = ? and code = ? and dele = 0`;
		sql = mysql.format(sql, [req.body.name, req.body.code]);
	}
	else if (req.body.name !="" && req.body.code == "" && req.body.product_category_name != "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date 
		 from product, product_category where product_category_id = product_category.id and product.name like ? and product_category.name = ? and product.dele  = 0`;
		sql = mysql.format(sql, ["%" + req.body.name + "%", req.body.product_category_name]);
	}
	else if (req.body.name =="" && req.body.code != "" && req.body.product_category_name != "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date	
		 from product, product_category where product_category_id = product_category.id and code like ? and product_category.name = ? and product.dele = 0`;
		sql = mysql.format(sql, ["%" + req.body.code + "%", req.body.product_category_name]);
	}
	// ca 3 thu deu rong => hien thi tat ca danh sach
	else if (req.body.name =="" && req.body.code == "" && req.body.product_category_name == ""){
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date
		 from product where dele = 0`;
	}
	// tim kiem theo ca 3 thu
	else {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date
		 from product, product_category 
		 where product_category_id = product_category.id and product.name = ? and code = ? and product_category.name = ? and product.dele = 0`;
		sql = mysql.format(sql, [req.body.name, req.body.code, req.body.product_category_name]);
	}
	// console.log(sql);
	con.query(sql, function(err, results) {
		//console.log("r: " + results);
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			products[i] = new product(results[i].id, results[i].code, results[i].name, results[i].price, results[i].description,
				results[i].image, results[i].product_category_id, results[i].create_date, results[i].update_date); 
		}
		res.send(products);
	})
	 
})