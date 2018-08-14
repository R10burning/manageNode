'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


//连接池模块---因为node.js机制,每一个模块都是"单例"
//多次require()不会创建多个
var mysql = require('mysql');
var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'manageNode',
	port: 3306,
	connectionLimit: 10
});
exports.default = pool;