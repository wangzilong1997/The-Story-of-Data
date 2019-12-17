var express = require('express')
var fs = require('fs')
var path = require('path')
var fortune = require('./lib/fortune.js')
var app = express()
var http = require('http')

var Mysql = require('./www/mysql')
var Pages = require('./www/pages')
var Middleware = require('./www/middleware')
var Handlefile = require('./www/handlefile')

var Comments = require('./www/comments')
var Api = require('./www/api')

var morgan = require('morgan')
let url = require('url')

var Schedule = require('./www/schedule')

//数据库操作部分
var mysql = require('mysql');
var connection = mysql.createConnection(Mysql.config());
connection.connect(Mysql.connect());

var bill;
var num;
var name;
//bill是一个异步的promise结果 没执行完之前不会显示
//bill = Mysql.select(connection)

new Promise((resolve,reject) => {
	bill = Mysql.select(connection)
	resolve(bill)
}).then((val)=>{
	console.log('val',val)
	num = val;
	console.log('num',num);
}).catch((err)=>{
	console.log("error:",err)

}).then(()=>{
	console.log("num22",num)
})

//子进程处理部分
const cp = require('child_process')
//静态资源
Middleware.statics(app,express,__dirname);
//上传文件保存的地址
Middleware.uploadDir(app,path,__dirname);

Handlefile.chatrecord(app,name,fs,cp);

//设置handlebars视图引擎
var handlebars = require('express3-handlebars').create({ 
	defaultLayout:'main',
	helpers:{
		section:function(name,options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');


//logging
let processes = [];
//默认页面
Pages.main(app,fortune,processes);

//提交处理页面
Pages.start(app,fortune);
Pages.qunar(app,__dirname);
Pages.about(app);

//resume页面
Pages.wangshuaishuai(app);
Pages.i(app,__dirname);

//子进程处理界面
Handlefile.process(app);

//天气数据接口
var weather =[];
Schedule.scheduleweather(weather)
//模板数据接口

Api.weather(app,weather,cp);
//评论接口部分
let comments = []
Comments.commentsfrom(app);
Comments.comments(app,url);
Comments.commentss(app);
Handlefile.processes(app);
//thank-you
Handlefile.thankyou(app);



setTimeout(()=>{
	//默认页面
	Pages.main(app,fortune,processes,num);
	console.log("endnum",num);
	//访问人数接口初始化并且每半个小时更新数据
	Api.handlebars(app,num,connection);
	//定制404页面
	Middleware["404"](app);
	//定制500页面
	Middleware["500"](app);
	var server = http.createServer(app);
	server.listen(80,function () {
		console.log('2s之后服务启动')
	});
},2000)

