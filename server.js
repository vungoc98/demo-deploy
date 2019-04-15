//Install express server
const express = require('express');
const jsonParser = require("body-parser").json();
const path = require('path');
const mysql = require('mysql');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/demo-deploy')); 
 
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
	var sql = "select distinct acount_type from user1 where acount_type != ?";
	sql = mysql.format(sql, 'Nhà phân phối');
	con.query(sql, function(err, results) {
		if (err) throw err;  
		res.send(results);
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
// 1.4. Cap nhat thong tin san pham
// Lay thong tin san pham can cap nhat
app.post('/getProductInfo', jsonParser, (req, res) => {  
	var sql = `select product.name, price, image, product.description, product_category.name as product_type 
	from product, product_category where product.id = ?
		and product_category_id = product_category.id`;
	sql = mysql.format(sql, req.body.id);
	console.log(sql);
	con.query(sql, function(err, results) {
		if (err) throw err; 
		res.send(results);
	})
})

// Cap nhat thong tin san pham
app.post('/updateProduct', jsonParser, (req, res) => {
	var product_category_id;
	// Tim product_category_id 
	var sql = "select id from product_category where name = ?";
	sql = mysql.format(sql, [req.body.product_type]);
	console.log("sql: " + sql);
	con.query(sql, function(err, results) {
		if (err) {
			res.send("0");
			throw err;
		}

		product_category_id = results[0].id; 
		// ngay hien tai => tuong duong voi ngay cap nhat thong tin
		var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate());
		 
		var sql = "update product set name = ?, price = ?, description = ?, image = ?, product_category_id = ?, update_date = ? where id = ?";
		sql = mysql.format(sql, [req.body.name, req.body.price, req.body.description, req.body.image, product_category_id, update_date, req.body.id]);
	 	console.log(sql);
		con.query(sql, function(err, results) {
			if (err) {
				res.send("0");
				throw err;
			}
			 
			res.send("1");
		})
	}) 
})
// 1.5. Hien thi danh sach nhom san pham 
let product_category = require('./product_category.js'); // Lop Product
product_categorys = new Array(); // Mang chua cac san pham
app.get('/getMenuProduct_Category', (req, res) => { 
	product_categorys.splice(0, products.length);
	var sql = `select id, name, description, date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as  update_date 
	from product_category where dele = 0`;
	con.query(sql, function(err, results) { 
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			product_categorys[i] = new product_category(results[i].id, results[i].name, results[i].description, results[i].create_date, results[i].update_date);
		}
		res.send(product_categorys);
	})
})

// 1.6. Tao moi nhom san pham
app.post('/createProduct_Category', jsonParser, (req, res) => { 
	// ngay hien tai => tuong duong voi ngay tao thong tin
	var create_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate());
	product_categorys.splice(0, products.length);
	var sql = "insert into product_category(name, description, dele, create_date) values(?, ?, ?, ?)";
	sql = mysql.format(sql, [req.body.name, req.body.description, 0, create_date]);
	con.query(sql, function(err, results) {
		if (err) throw err;
		var sql = `select id, name, description, date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as  update_date 
	from product_category`;
		con.query(sql, function(err, results) { 
			if (err) throw err;
			for(var i = 0; i < results.length; i++) {
				product_categorys[i] = new product_category(results[i].id, results[i].name, results[i].description, results[i].create_date, results[i].update_date);
			}
			res.send(product_categorys);
		})
	})
})

// 1.7. Cap nhat thong tin nhom san pham
// Lay thong tin nhom san pham can cap nhat
app.post('/getProductCategoryInfo', jsonParser, (req, res) => {
	var sql = "select name, description from product_category where name = ?";
	sql = mysql.format(sql, req.body.name); 
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})

// Cap nhat thong tin nhom san pham
app.post('/updateProduct_Category', jsonParser, (req, res) => { 
	// ngay hien tai => tuong duong voi ngay cap nhat thong tin
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate());
	 
	var sql = "update product_category set description = ?, update_date = ? where name = ?";
	sql = mysql.format(sql, [req.body.description, update_date, req.body.name]); 
	con.query(sql, function(err, results) {
		if (err) {
			res.send("0");
			throw err;
		}
		 
		res.send("1");
	}) 
})

// II. He thong kho hang

// 2.1. Tao moi kho hang 
app.post('/createContainer', jsonParser, (req, res) => { 
	// ngay hien tai => tuong duong voi ngay tao thong tin
	var create_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate());
	 
	// sinh ma code ngau nhien cho kho hang
	var rdmCode = "";
	for( ; rdmCode.length < 6; rdmCode  += Math.random().toString(36).substr(2));
	var code = "CONTAINER_" + rdmCode.substr(0, 6);

	var sql = "insert into container(code, name, address, dele, mobile, create_date) values(?, ?, ?, ?, ?, ?)";
	sql = mysql.format(sql, [code, req.body.name, req.body.address, 0, req.body.mobile, create_date]); 
	con.query(sql, function(err, results) {
		if (err) {
			res.send("0");
			throw err;
		}
		 
		res.send("1");
	}) 
})

// 2.2. Lay danh sach kho hang 
let container = require('./container.js'); // Lop Product
containers = new Array(); // Mang chua cac san pham
app.get('/getMenuContainer', (req, res) => { 
	containers.splice(0, containers.length);
	var sql = `select id, code, name, address, dele, mobile, 
	date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as update_date 
	from container where dele = 0`;
	con.query(sql, function(err, results) { 
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			containers[i] = new container(results[i].id, results[i].code, results[i].name, results[i].address,
			results[i].dele, results[i].mobile, results[i].create_date, results[i].update_date);
		}
		res.send(containers);
	})
})

// Tim kiem kho hang
app.post('/searchContainer', jsonParser, (req, res) => {
	containers.splice(0, containers.length);
	var sql;

	// chi tim kiem theo ten
	if (req.body.name.trim() != "" && req.body.code.trim() == "") {
		sql = `select id, code, name, address, dele, mobile, 
		date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as update_date from container
		where name like ? and dele = 0`;
		sql = mysql.format(sql, ["%" + req.body.name.trim() + "%"]); 
	}

	// chi tim kiem theo code
	else if (req.body.name.trim() == "" && req.body.code.trim() != "") {
		sql = `select id, code, name, address, dele, mobile, 
		date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as update_date from container
		where code like ? and dele = 0`; 
		sql = mysql.format(sql, ["%" + req.body.code.trim() + "%"]); 
	}

	// tim kiem theo ca ten va code
	else if (req.body.name.trim() != "" && req.body.code.trim() != "") {
		sql = `select id, code, name, address, dele, mobile, 
		date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as update_date from container
		where name = ? or code = ? and dele = 0`;
		sql = mysql.format(sql, [req.body.name.trim(), req.body.code.trim()]); 
	}

	// name va code deu trong
	else {
		sql = `select id, code, name, address, dele, mobile, 
	date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as update_date 
	from container where dele = 0`;
	}
	 
	con.query(sql, function(err, results) { 
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			containers[i] = new container(results[i].id, results[i].code, results[i].name, results[i].address,
			results[i].dele, results[i].mobile, results[i].create_date, results[i].update_date);
		}
		res.send(containers);
	})
})

// 2.3. Xem chi tiet kho hang id
// 2.3.1. Thong tin co ban
app.post('/getContainerInfo', jsonParser, (req, res) => {
	var sql = "select * from container where id = ?";
	sql = mysql.format(sql, req.body.id);
	con.query(sql, function(err, results) { 
		if (err) throw err;
		res.send(results);
	})
})

// Cap nhat thong tin kho hang
app.post('/updateContainerInfo', jsonParser, (req, res) => {
	// ngay hien tai => ngay cap nhat thong tin kho hang
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate());
	 
	var sql = "update container set address = ?, mobile = ?, update_date = ? where id = ?";
	sql = mysql.format(sql, [req.body.address, req.body.mobile, update_date, req.body.id]);
	con.query(sql, function(err, results) { 
		if (err) {
			res.send("0");
			throw err;
		} 
		res.send("1");
	})
})

// 2.3.2. Tinh trang kho hang
app.post('/statusContainer', jsonParser, (req, res) => {
	products.splice(0, products.length);
	var sql = `select distinct product.id, product.code, user_id, product.name, amount, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date,
	 date_format(expiry_date, '%d-%m-%Y') as expiry_date from product, 
	 container_product_detail where product.id = container_product_detail.product_id and container_product_detail.container_id = ?`;
	sql = mysql.format(sql, req.body.id);
	con.query(sql, function(err, results) {
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			products[i] = new product(results[i].id, results[i].code, results[i].name, "", "", "", "", "", "",
			 results[i].amount, results[i].manufacturing_date, results[i].expiry_date, results[i].user_id); 
		} 
		res.send(products);
	})
})

// Lay id cua cac container khac (Phuc vu qua trinh chuyen hang hoa)
app.post('/getAnotherIdContainer', jsonParser, (req, res) => {
	var sql = "select id from container where id != ? and dele = 0";
	sql = mysql.format(sql, req.body.id);
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})

// Cap nhat thong tin chuyen kho
app.post('/moveProductInfo', jsonParser, (req, res) => {
	// ngay hien tai => tuong duong voi ngay cap nhat thong tin
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate());
	 
	/* Kiem tra hang hoa chuyen den da co trong kho dich chua
	* 1. Da co => Cap nhat lai so luong cua hang hoa o ca 2 kho
	* 2. Chua co => Them hang hoa vao kho dich va cap nhat hang hoa o kho nguon
	*/
	var sql = "select id, amount from container_product_detail where product_id = ? and container_id = ? and manufacturing_date = ? and expiry_date = ?";
	sql = mysql.format(sql, [req.body.product_id, req.body.container_to, req.body.manufacturing_date, req.body.expiry_date]);
	con.query(sql, function(err, results) {
		if (err) {
			res.send("0");
			throw err;
		}
		// Truong hop 1: San pham can chuyen da co trong kho dich
		if (results.length != 0) {
			// Cap nhat so luong cua kho dich
			sql = "update container_product_detail set amount = ?, update_date = ? where container_id = ? and product_id = ?";
			sql = mysql.format(sql, [(parseInt(req.body.amount) + parseInt(results[0].amount)), update_date, req.body.container_to, req.body.product_id]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
			})

			// Cap nhat so luong cua kho nguon
			sql = "update container_product_detail set amount = ?, update_date = ? where container_id = ? and product_id = ?";
			sql = mysql.format(sql, [(parseInt(req.body.amount_before) - parseInt(req.body.amount)), update_date, req.body.container_from, req.body.product_id]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
			})

			// Them thong tin vao bang container_product_log
			sql = `insert into container_product_log(container_from, container_to, product_id, amount, manufacturing_date, expiry_date, update_date) 
				values (?, ?, ?, ?, ?, ?, ?)`;
			sql = mysql.format(sql, [req.body.container_from, req.body.container_to, req.body.product_id, req.body.amount, req.body.manufacturing_date, req.body.expiry_date, update_date]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
				res.send("1");
			})
		}

		// Truong hop 2: San pham can chuyen chua co trong kho dich
		else {
			// Them thong tin san pham vao kho dich
			sql = "insert into container_product_detail(product_id, container_id, user_id, amount, manufacturing_date, expiry_date, update_date) values (?, ?, ?, ? ,? , ?, ?)";
			sql = mysql.format(sql, [req.body.product_id, req.body.container_to, req.body.user_id, req.body.amount, req.body.manufacturing_date, req.body.expiry_date, update_date]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
			})

			// Cap nhat so luong cua kho nguon
			sql = "update container_product_detail set amount = ?, update_date = ? where container_id = ? and product_id = ?";
			sql = mysql.format(sql, [(parseInt(req.body.amount_before) - parseInt(req.body.amount)), update_date, req.body.container_from, req.body.product_id]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
			})

			// Them thong tin vao bang container_product_log
			sql = `insert into container_product_log(container_from, container_to, product_id, amount, manufacturing_date, expiry_date, update_date) 
				values (?, ?, ?, ?, ?, ?, ?)`;
			sql = mysql.format(sql, [req.body.container_from, req.body.container_to, req.body.product_id, req.body.amount, req.body.manufacturing_date, req.body.expiry_date, update_date]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
				res.send("1");
			})
		}
	})
})

// Tim kiem san pham trong tab: Tinh trang kho hang
app.post('/searchProductStatusContainer', jsonParser, (req, res) => {
	products.splice(0, products.length);
	var sql; 

	// Tim kiem theo ca name va code
	if (req.body.name.trim() != "" && req.body.code.trim() != "") {
		sql = `select distinct product.id, product.code, user_id, product.name, amount, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date from product, 
	 container_product_detail where product.id = container_product_detail.product_id and container_product_detail.container_id = ? and product.name = ? and product.code = ?`;
		sql = mysql.format(sql, [req.body.id, req.body.name, req.body.code]);
	}

	// Chi tim kiem theo name
	else if (req.body.name.trim() != "" && req.body.code.trim() == "") {
		sql = `select distinct product.id, product.code, user_id, product.name, amount, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date from product, 
	 container_product_detail where product.id = container_product_detail.product_id and container_product_detail.container_id = ? and product.name like ?`;
		sql = mysql.format(sql, [req.body.id, "%" +  req.body.name + "%"]);
	}

	// Chi tim kiem theo code
	else if (req.body.name.trim() == "" && req.body.code.trim() != "") { 
		sql = `select distinct product.id, product.code, user_id, product.name, amount, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date from product, 
	 container_product_detail where product.id = container_product_detail.product_id and container_product_detail.container_id = ? and product.code like ?`;
		sql = mysql.format(sql, [req.body.id, "%" +  req.body.code + "%"]);
	}

	// name va code deu de trong
	else { 
		sql = `select distinct product.id, product.code, user_id, product.name, amount, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date from product, 
	 container_product_detail where product.id = container_product_detail.product_id and container_product_detail.container_id = ?`;
		sql = mysql.format(sql, [req.body.id]);
	}
 
	con.query(sql, function(err, results) {
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			products[i] = new product(results[i].id, results[i].code, results[i].name, "", "", "", "", "", "",
			 results[i].amount, results[i].manufacturing_date, results[i].expiry_date, results[i].user_id); 
		}
		res.send(products);
	})
})

// 2.3.3. Lich su kho hang
let container_log = require('./container_product_log.js');
containerLogs = new Array(); // Mang chua thong tin cua lich su kho hang

// Hien thi lich su kho hang
app.post('/getContainerLog', jsonParser, (req, res) => {
	containerLogs.splice(0, containerLogs.length);
	products.splice(0, products.length);
	var sql = `select distinct name, code, amount, container_from, container_to, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date, 
	 date_format(container_product_log.update_date, '%d-%m-%Y') as update_date from product, 
	 container_product_log where product.id = container_product_log.product_id and container_product_log.container_from = ?`;
	sql = mysql.format(sql, req.body.id); 
	con.query(sql, function(err, results) {
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			containerLogs[i] = new container_log("", results[i].container_from, results[i].container_to, "", results[i].amount,
				results[i].manufacturing_date, results[i].expiry_date, results[i].name, results[i].code, results[i].update_date); 
		}
		res.send(containerLogs);
	})
})

// Tim kiem san pham trong tab: Lich su kho hang
app.post('/searchProductContainerLog', jsonParser, (req, res) => {
	containerLogs.splice(0, containerLogs.length);
	products.splice(0, products.length);
	var sql;
	if (req.body.name.trim() != "" && req.body.code.trim() != "") {
		sql =  `select name, code, amount, container_from, container_to, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date , 
		 date_format(container_product_log.update_date, '%d-%m-%Y') as update_date from product,
	 container_product_log where product.id = container_product_log.product_id and container_product_log.container_from = ? and name = ? and code = ?`;
		sql = mysql.format(sql, [req.body.id, req.body.name.trim(), req.body.code.trim()]);
	}
	else if (req.body.name.trim() != "" && req.body.code.trim() == "") {
		sql =  `select name, code, amount, container_from, container_to, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date , 
		 date_format(container_product_log.update_date, '%d-%m-%Y') as update_date from product, 
	 container_product_log where product.id = container_product_log.product_id and container_product_log.container_from = ? and name like ?`;
		sql = mysql.format(sql, [req.body.id, "%" + req.body.name.trim() + "%"]);
	}
	else if (req.body.name.trim() == "" && req.body.code.trim() != "") {
		sql =  `select name, code, amount, container_from, container_to, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date , 
		 date_format(container_product_log.update_date, '%d-%m-%Y') as update_date from product,
	 container_product_log where product.id = container_product_log.product_id and container_product_log.container_from = ? and code like ?`;
		sql = mysql.format(sql, [req.body.id, "%" + req.body.code.trim() + "%"]);
	}
	else {
		sql =  `select name, code, amount, container_from, container_to, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date , 
		 date_format(container_product_log.update_date, '%d-%m-%Y') as update_date from product, 
	 container_product_log where product.id = container_product_log.product_id and container_product_log.container_from = ?`;
		sql = mysql.format(sql, [req.body.id]);
	}
  
	con.query(sql, function(err, results) {
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			containerLogs[i] = new container_log("", results[i].container_from, results[i].container_to, "", results[i].amount,
				results[i].manufacturing_date, results[i].expiry_date, results[i].name, results[i].code, results[i].update_date); 
		}
		res.send(containerLogs);
	})
})

// 2.3.4. Thong ke kho hang
thongke = require('./thong_ke.js');
var amount_from;
var amount_order;
var amount_to;
var amount_rest;
var array_product_TK = new Array();
// Xu ly bat dong bo trong cac cau truy van mysql - nodejs
const promisify = require("util").promisify; 
const queryPromise = promisify(con.query.bind(con)); 

async function thongKeKhoHang(id) { 
	// Kiem tra xem co phai kho tong hay khong
	var sql = "select name from container where id = ?";
	sql = mysql.format(sql, id);
	results = await queryPromise(sql);
	if (results[0].name == "Kho tổng") {
			sql = `select sum(amount_total) as amount_from from user1, orders where orders.user_id = user1.id and user1.acount_type = ?`;
			sql = mysql.format(sql, ["Siêu thị"]);  
	}
	else {
		sql = "select sum(amount) as amount_from from container_product_log where container_to = ?";
		sql = mysql.format(sql, id);
	}
	results = await queryPromise(sql);
	amount_from = results[0].amount_from;  

	sql = "select sum(amount) as amount_to from container_product_log where container_from = ?";
	sql = mysql.format(sql, id); 
	results = await queryPromise(sql);
	amount_to = results[0].amount_to; 

	sql = "select sum(amount) as amount_rest from container_product_detail where container_id = ?";
	sql = mysql.format(sql, id);
	results = await queryPromise(sql);
	amount_rest = results[0].amount_rest;

	sql = `select product.code, product.name, product.image, sum(amount) as amount from container_product_detail,product 
	where container_id = ? and product_id = product.id and amount > 0  group by product_id`
	sql = mysql.format(sql, id);  
	results = await queryPromise(sql); 
	for (var i = 0; i < results.length; i++) {
		product_thongke = new product("", results[i].code, results[i].name, "", "", results[i].image, "", "", "")
		product_thongke.amount = results[i].amount;  
		array_product_TK[i] = product_thongke;
	} 
}

app.post('/thongKeKhoHang', jsonParser, async function(req, res) { 
	array_product_TK.splice(0, array_product_TK.length);
	await thongKeKhoHang(req.body.id); 
	ketquathongke = new thongke(amount_from, amount_from - amount_to - amount_rest , amount_to, amount_rest, array_product_TK);  
	res.send(ketquathongke);  
})

// Thong ke toan bo kho hang
var amount_import; // so luong nhap
var amount_export; // so luong xuat
var amount_manufacturing; // so luong con han
var amount_expiry; // so luong het han
var products = new Array(); // mang cac san pham con lai trong kho
var ketquathongketoanbo = new Object();
var array_product_TKTB = new Array();

async function thongKeToanBo() {  
	sql = `select sum(amount_total) as amount_import from user1, orders where orders.user_id = user1.id and user1.acount_type = ?`;
	sql = mysql.format(sql, ["Siêu thị"]);   
	 
	results = await queryPromise(sql);
	amount_import = results[0].amount_import;  

	sql = "select sum(amount) as amount_manufacturing from container_product_detail where expiry_date >= CURDATE()";
	sql = mysql.format(sql); 
	results = await queryPromise(sql);
	amount_manufacturing = results[0].amount_manufacturing; 

	sql = "select sum(amount) as amount_expiry from container_product_detail where expiry_date < CURDATE()";
	sql = mysql.format(sql);
	results = await queryPromise(sql);
	amount_expiry = results[0].amount_expiry;

	sql = `select product.code, product.name, product.image, sum(amount) as amount from container_product_detail,product 
	where product_id = product.id and expiry_date >= CURDATE() and amount > 0 group by product_id`
	sql = mysql.format(sql);  
	results = await queryPromise(sql); 
	for (var i = 0; i < results.length; i++) {
		product_thongke = new product("", results[i].code, results[i].name, "", "", results[i].image, "", "", "")
		product_thongke.amount = results[i].amount;  
		array_product_TKTB[i] = product_thongke;
	} 
}

app.get('/thongketoanbo', async function(req, res) {
	array_product_TKTB.splice(0, array_product_TK.length);
	await thongKeToanBo(); 
	ketquathongketoanbo.amount_import = amount_import;
	ketquathongketoanbo.amount_export = amount_import - amount_manufacturing - amount_expiry ;
	ketquathongketoanbo.amount_manufacturing = amount_manufacturing;
	ketquathongketoanbo.amount_expiry = amount_expiry;
	ketquathongketoanbo.products =array_product_TKTB;   
	res.send(ketquathongketoanbo);  
})