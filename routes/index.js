var fs = require('fs');
var path = require('path');
var { Router } = require('express');
var router = Router();
 
router.get('/', function(req, res){
    var filelist = req.list;
    res.render('index.html', {
        message: 'TRIPLEXLAB',   // message 란 변수를 템플릿으로 내보낸다.
        lists : filelist         // data라는 폴더에서 파일을 불러와, lists로 넘긴다.
    });
});

router.get('/page/:pageId', function(req, res, next){     // 본문글 나오는 라우터 구현
    var filelist = req.list;
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`./data/${filteredId}`, function(error, description){   //readFile는 파일 내용을 읽어 올수 있다.
        if(error){
            next(error);  //인자로 error를 넘겨주면 app.js에서 55번줄 미들웨어가 실행되기로 약속되어 있다.
        } else {
            res.render('index.html', {
                message: 'TRIPLEXLAB',
                tit : filteredId,
                lists : filelist,
                desc : description
            });
        }
    });
});

module.exports = router;