const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mg_config = require('./config/mg-config.json');
const router = require('./routes/index');

// public 폴더 안의 파일 임포트 적용
app.use(express.static('public'));
// request.body에 객체 형식의 데이터 포맷을 넘겨주는 함수
app.use(bodyParser.json());
// 모름
app.use(bodyParser.urlencoded({extended: false}));

const conn = mongoose.connection;
mongoose.Promise = global.Promise;

conn.on('error', console.error.bind(console, "mongoose connection error:"));
conn.openUri(`mongodb://127.0.0.1:27017/mongodb`);
conn.once('open', () => {
	console.log("mongoose connect successfully..");
});

// 서버 실행
server.listen(3000, () => {
	console.log('node start!');
});
// use ejs template
app.set('view engine', 'ejs');
app.set('view engine', 'jade');
app.use(router);

app.get('/login',function(req,res){
	//var refreshToken = Kakao.Auth.getRefreshToken();
	//Kakao.Auth.setAccessToken(accessTokenFromServer);
  res.sendfile(__dirname + '/login.html' )
})
