'use strict' //设置为严格模式

const crypto = require('crypto'),//引入加密模块
	   https = require('https'),//引入https模块
		util = require('util'),//引入util工具包
		fs   = require('fs'),//引入fs模块
	urltil   = require('url'),//引入url模块
accessTokenJson = require('./access_token'),//引入本地存储的access_token
	menus    = require('./menus'),//引入微信菜单配置	
	parseString = require('xml2js').parseString,//引入xml2js包
		msg  = require('./msg'),//引入消息处理模块
CryptoGraphy = require('./cryptoGraphy');//微信消息加解密模块

/*
	构建WeChat对象
*/


