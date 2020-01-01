
var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');

//라우터 경로를 가져온다.
var index = require('./routes/index');
var admin = require('./routes/admin'); 
var page = require('./routes/page');
var create = require('./routes/create');
var update = require('./routes/update');
var deletes = require('./routes/delete');


var app = express();
var port = 5000;

// 확장자가 .html 로 끈나는 뷰 엔진을 추가한다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
 
nunjucks.configure(__dirname + '/views', {
    autoescape: true,
    express: app,
    watch: true
});

// Routing 미들웨어
app.use('/', index);
app.use('/admin', admin);
app.use('/about', page);
app.use('/create', create);
app.use('/update', update);
app.use('/delete', deletes);

app.listen( port, function(){
    console.log(`Example app listening on port ${port}! http://localhost:${port}`);
});