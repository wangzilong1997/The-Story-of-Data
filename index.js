var express = require('express')
var fs = require('fs')
var path = require('path')
var fortune = require('./lib/fortune.js')
var app = express()
var http = require('http')
var https = require('https')

var Mysql = require('./www/mysql')
var Router = require('./www/router')
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

//bill是一个异步的promise结果 没执行完之前不会显示
bill = Mysql.select(connection)
var num ;
setTimeout(async ()=>{console.log('really',bill);num = bill;},1000)


//访问记录持续写入数据
setInterval(function(){
	console.log(num)
	console.log(bill)
	if(num===bill){
		console.log('并没有人访问')
	}
	else{
		Mysql.insert(num,connection);
		console.log('else执行');
		bill = Mysql.select(connection);
	}
},3600000)

//子进程处理部分
const cp = require('child_process')
//静态资源
app.use(express.static(__dirname + '/public'));
//upload destination setup
app.set('files',path.join(__dirname,'/public/files'));


var name;
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
switch(app.get('env')){
	case 'development':
		//开发模式默认 紧凑彩色的开发日志
		app.use(require('morgan')('dev'));
		console.log('development morgan')
		break;
	case 'production':
		//模块'express-logger' 支持按日志循环
		app.use(require('express-logger')({
			path:__dirname + '/log/requests.log'
		}));
		console.log('express-logger production')
		break;
}
//开发模式下将日志写入access.log的文件
var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
//写入log 是英国格林威治时间
app.use(morgan('combined',{stream:accessLogStream}));
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
//模板数据接口
Api.handlebars(app,num);
//天气数据接口
var weather =[];
Schedule.scheduleweather(weather)

Api.weather(app,weather,cp);
//评论接口部分
let comments = []
Comments.commentsfrom(app);
Comments.comments(app,url);
Comments.commentss(app);
Handlefile.processes(app);
//thank-you
Handlefile.thankyou(app);
//定制404页面
Middleware["404"](app);
//定制500页面
Middleware["500"](app);
process.on('SIGTERM',function(){
	console.log('SIGTERM执行')
	Mysql.insert(num,connection);
	process.exit(0);
});

process.on('SIGINT',function(){
	Mysql.insert(num,connection);;
	setTimeout(() => {
		console.log('SIGINT执行');
		process.exit(1)
	},3000)
});
http.createServer(app).listen(80)
