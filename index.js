var express = require('express')
var fs = require('fs')
var path = require('path')
var fortune = require('./lib/fortune.js')
var app = express()
var http = require('http')
var https = require('https')
var privatepem = fs.readFileSync('path/to/2031967_www.wangshuaishuai.com.pem','utf8')
var privatekey = fs.readFileSync('path/to/2031967_www.wangshuaishuai.com.key','utf8')
var credentials = {key:privatekey,cert:privatepem}
//var credentials = require('./lib/credentials.js')
//微信部分
/*const wechat = require('./wechat/wechat'),
		wcconfig = require('./wcconfig');

var wechatApp = new wechat(wcconfig);*/
//微信部分结束
var morgan = require('morgan')
let url = require('url')
//cron风格定时器
const schedule = require('node-schedule');
//定义每天定时执行
const scheduleweather = () =>{
	//每天每小时执行
	schedule.scheduleJob('30 0 * * * *',()=>{
		weather = [];
		console.log('schedule执行：'+ new Date());
	});
}
scheduleweather();
//数据库操作部分
var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'sum',
	prot:'3306'
});
connection.connect(function(err){
	if(err){
		console.log('___:'+err);
		return;
	}
	console.log('链接数据库')
});

function insert(){
	var ins = 'insert into number (people) values (?)';
	var param = num;
	connection.query(ins,param,function(err,rs){
		if(err){
			console.log(err.message);
			return;
		}
		console.log('插入数据完成');
	});
}
function select(){
	connection.query('select people from number',function(err,res){
		if(err){
			console.log(err);
			return;
		}
		rlen = res.length
		num = res[rlen-1].people
		bill = num
	});
}
function close(){
	connection.end(function(err){
		if(err){
			console.log('___:'+err);
			return
		}
		console.log('关闭成功')
	})
}

var bill;
var num;
select();

//访问记录持续写入数据
setInterval(function(){
	console.log(num)
	console.log(bill)
	if(num===bill){
		console.log('并没有人访问')
	}
	else{
		insert();
		console.log('else执行');
		select();
	}
},3600000)
//图片文件上传部分
var formidable = require('formidable')
//子进程处理部分
const cp = require('child_process')
//静态资源
app.use(express.static(__dirname + '/public'));
//upload destination setup
app.set('files',path.join(__dirname,'/public/files'));
app.get('/chatrecord',function(req,res){
	var now = new Date();
	res.render('/chatrecord',{
		year:now.getFullYear(),
		month:now.getMont(),
	});
});
var name;
app.post('/chatrecord/:year/:month',function(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = './public/files';
	form.parse(req,function(err,fields,files){
		name = fields.name
		if(err) return res.redirect(303,'/error');
		let filepath = files.txt.path
		let file = filepath.split('/')
	   /*etTimeout(()=>{
			fs.unlink(filepath,(err)=>{
				if(err) {
					throw err;
				}
				console.log('成功删除了'+filepath)
			});
			fs.unlink('views/userfile/'+file[2]+'.handlebars',(err)=>{
				if(err){
					throw err;
				}
				console.log('成功删除了views/userfile/'+file[2]+'.handlebars')
			});
		},1000 * 600)*/
		cp.exec('python two.py '+name+' '+filepath,(err,stdout,stderr)=>{
			if(err) console.log('stderr',err)
			if(stdout) console.log('stdout',stdout)
			console.log(file[2] + '当前用户处理程序完成')
			console.log(filepath)
			res.redirect(303,'/thank-you?userid='+file[2])
		});
		num++;
		console.log(num)
	})
});

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


//app.set('port',process.env.PORT || 4222);
//logging

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
app.get('/',function(req,res){
		res.render('home');
		num++;
		console.log(num)
});
//提交处理页面
app.get('/start',function(req,res){
		res.render('start',{ fortune: fortune.getFortune() });
		num++;
		console.log(num)
});
app.get('/qunar',function(req,res){
		res.sendFile(__dirname + '/index.html');
});
//关于页面
app.get('/about',function(req,res){
		res.render('about');
		num++;
		console.log(num)
});

//resume页面
app.get('/i',function(req,res){
		res.sendFile(__dirname + '/resume/index.html');
});
//echarts页面
app.get('/echarts',function(req,res){
		fs.readdir('charts/html',function(err,files){
			if(err){
				console.log(err)
				return err;
			}
		var file = files[Math.floor(Math.random() * files.length)]
		console.log(file)
		res.sendFile(__dirname + '/charts/html/' + file);
		num++;
		console.log(num);
		});	
});
//子进程处理界面
app.get('/process',function(req,res){
	console.log(req.query.userid)
	res.render('userfile/'+req.query.userid)
	num++
	console.log(num)
});
//模板数据接口
app.get('/handlebars',function(req,res){
		res.status(200);
		res.json({num})
});
//天气数据接口
var weather =[];
app.get('/weather',function(req,res){
		res.status(200);
		console.log(typeof(weather))
		if(weather instanceof Object){
			cp.exec('python weather.py',(err,stdout,stderr)=>{
				if(err) console.log('stderr',err);
				if(stdout) weather=stdout
				console.log(typeof(weather));
				res.json({weather})
			})
		}
		else{
			console.log('String执行');
			res.json({weather});
		}
	
});
//评论接口部分
let comments = [
   {
      name: 'jack',
	  content: 'hello world',
	  time: '2019-5-1'
   },
   {
	  name: 'Tom',
      content: 'hello world',
	  time: '2019-5-1'
	},
  ]
app.get('/comments/form',(req,res) => {
		res.render('comform');
		num++
});

app.get('/comments',(req,res) => {
		let com = url.parse(req.url,true)
		console.log(com)
		let pathname = com.pathname
		let query = com.query
		console.log(pathname)
		console.log(query)
		if (query.name) {
			var date = new Date();

			let time = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+'-'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
			console.log(time)
			query.time = time
			comments.unshift(query);
		}
		res.statusCode = 302
		res.setHeader('location','/commentss')
		res.end()
});
app.get('/commentss',(req,res) => {
		num++
		res.render('comments',{comments:comments});
});

//thank-you
app.get('/thank-you',function(req,res){
		console.log(req.query.userid)
		num++;
		console.log(num);
		res.render('thank-you',{userid:req.query.userid});
});

// keguan
app.get('/keguan',function(req,res){
		console.log('文件被下载')
		res.download("keguan.exe");
});
//定制404页面
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

//定制500页面
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

//var srv = http.createServer(function(req,res){
//});
//希望进程退出时写入服务器
//process.on('SIGTERM',shutDown())
//process.on('SIGINT',shutDown())
function shutDown(){
	console.log('Received kill signal,shutting down gracefully')
	srv.close(() => {
		console.log('Closed out remaining connections');
		process.exit(0);
	});

	setTimeout(() => {
		console.error('Could not close connections in time, forcefully shutting down');
		process.exit(1);
	},10000);
}
//srv.listen(80)
//process.on('beforeExit',function(){
//	console.log('beforeExit执行')
//})


//kill 程序时保存到数据库
process.on('SIGTERM',function(){
	console.log('SIGTERM执行')
	insert();
	process.exit(0);
});

process.on('SIGINT',function(){
	insert();
/*	
	setTimeout(() =>{
		close();
		console.log('数据库关闭完成');
		//执行两遍的错误 未解决
	},1000)
*/	
	setTimeout(() => {
		console.log('SIGINT执行');
		process.exit(1)
	},3000)
	
});
http.createServer(app).listen(80)
https.createServer(credentials,app).listen(443)
