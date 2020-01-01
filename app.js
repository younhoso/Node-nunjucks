
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression')
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

// bodyParser.urlencoded({ extended: false })이부분에서 미들웨어가 자동으로 들어오게 된다.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static')) // static파일 안에서 정적인 파일을 찾겠다라는 뜻
app.use(compression());

// 파일 목록을 읽어오는 미들웨어 만들기
app.get('*', function(req, _, next){   // 이렇게 바꿔주면 get방식으로만 요청된 것들만 글 목록을 가져온다.
    fs.readdir('./data', function(error, filelist){  //readdir는 파일 목록를 가져올수 있다.
        req.list = filelist;  // filelist는 파일 목록을 req.list 변수에 담아 사용
        next();     //그다음에 호출되어야 할 미들웨어가 담겨 있다.
    });
});

// Routing 미들웨어
app.use('/', index);
app.use('/admin', admin);
app.use('/about', page);
app.use('/create', create);
app.use('/update', update);
app.use('/delete', deletes);

app.use(function(_, res, _){
    res.status(404).send('Sorry cant find that!');
});

app.use(function(err, _, res, _) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen( port, function(){
    console.log(`Example app listening on port ${port}! http://localhost:${port}`);
});