var mysql = require('mysql');
//链接数据库
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'sum',
	prot:'3306'
});
connection.connect(function(err){
	if(err){
		console('-----:'+err);
		return;
	}
	console.log('链接成功');
});
//插入一条数据
var ins = 'insert into number (people) values (?)';
var param = 330;
connection.query(ins,param,function(err,rs){
	if(err){
		console.log(err.message);
		return;
	}
	console.log('插入数据完成');
});
//执行查询 
connection.query('select * from number',function(err,rs){
	if(err){
		console.log(err);
		return;
	}
	console.log(rs)
});
connection.end(function(err){
	if(err){
		console.log('---:'+err);
		return;
	}
	console.log('关闭成功')
});
