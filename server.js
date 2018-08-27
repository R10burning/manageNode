//1:加载对应模块
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser' //处理post请求
import cookieParser from 'cookie-parser' //session
import expressSession from 'express-session' //session
import cors from 'cors' //cors
import pool from './connect/pool'
import fs from 'fs'
//导入加密模块
const crypto = require('crypto')
//2:引用连接池
//3:创建express 对象
let app = express()
let server = http.createServer(app)
server.listen(9498)
app.use(cors({}))
//4.2:post  req.body.uname
app.use(bodyParser.urlencoded({
	extended: false
}))
//4.3:cookie/session
app.use(cookieParser())
app.use(expressSession({
	resave: false, //每次请求是否重新设置session
	saveUninitialized: true, //每次请求是否设置cookie
	secret: 'teducn', //https加密码传输，密钥
}))
//5:指定静态资源目录  public
// app.get("/index", (req, res) => {
//     let login_name = req.query.name;
//     let pwd = req.query.pwd;
//     let md5 = crypto.createHash("md5");
//     let newPas = md5.update(pwd).digest("hex");
//     pool.getConnection((err, conn) => {
//         if (err) throw err;
//         //4:创建sql语句并且发送sql获取返回结果
//         let sql = " SELECT name FROM sys_user";
//         sql += " WHERE  login_name= ? AND password=?";
//         conn.query(sql, [login_name, newPas], (err, result) => {
//             if (err) throw err;
//             if (result.length > 0) {
//                 //获取uid值,保存session
//                 req.session.name = result[0].name;
//                 //  res.json({code:1,msg:"登录成功"});
//                 res.jsonp({ code: 10000, data: result[0].name });
//             } else {
//                 res.jsonp({ code: -3, msg: "用户名或密码有误" });
//             }
//             conn.release();
//         });
//         //5:返回 json
//         //6如果登录保存 uid session
//     });
// })
// app.get("/list", (req, res) => {
//     pool.getConnection((err, conn) => {
//         if (err) throw err;
//         let sql = "SELECT user_name FROM sys_car";
//         conn.query(sql, (err, result) => {
//             if (err) throw err;
//             fs.readFile('./package.json', (err, data) => {
//                 res.jsonp(JSON.parse(data.toString()));
//             })
//         })
//     })
// })
app.get('/list', (req, res) => {
	pool.getConnection((err, conn) => {
		if (err) throw err
		let sql = 'SELECT r10_user.`name` FROM r10_user'
		conn.query(sql, (err, result) => {
			if (err) throw err
			res.json(result)
		})
	})
})
/* 菜单 */
app.get('/menu', (req, res) => {
	const menuData = [{
		'id': 1,
		'parent_id': 0,
		'menu_name': '第一级菜单 1',
		'sorting': 0,
		'node': [{
			'id': 2,
			'parent_id': 1,
			'menu_name': '第二级菜单 1-1',
			'sorting': 0,
			'node': [{
				'id': 3,
				'parent_id': 2,
				'menu_name': '第三级菜单 1-1-1',
				'sorting': 1
			}]
		}]
	},
	{
		'id': 4,
		'parent_id': 0,
		'menu_name': '第一级菜单 2',
		'sorting': 0,
		'node': [{
			'id': 5,
			'parent_id': 4,
			'menu_name': '第二级菜单 2-1',
			'sorting': 0
		}]
	}
	]
	res.json(menuData)
})

app.get('/', (req, res) => {
	res.send('hello')
})