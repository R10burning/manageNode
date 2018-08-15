// 全局安装npm i supervisor -g ====>supervisor server.js
import express from 'express'

const app = express()

app.get('/', function (req, res) {
	res.send('Hello Worssssssssld!')
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})