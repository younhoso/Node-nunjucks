var fs = require('fs');
var path = require('path');
var { Router } = require('express');
var router = Router();
 

router.get('/', function(_, res){
    fs.readdir('./data', function(error, filelist){  //readdir는 폴더 위치를 지정가능하다.
        res.render('index.html', {
            message: 'TRIPLEXLAB',   // message 란 변수를 템플릿으로 내보낸다.
            lists : filelist         // data라는 폴더에서 파일을 불러와, lists로 넘긴다.
        });
    });
});

router.get('/page/:pageId', function(req, res){  // 본문글 나오는 라우터 구현
    fs.readdir('./data', function(error, filelist){     //readdir는 폴더 위치를 지정가능하다.
        var filteredId = path.parse(req.params.pageId).base;
        fs.readFile(`./data/${filteredId}`, function(error, description){   //readFile는 파일 내용을 읽어 올수 있다.
            res.render('index.html', {
                tit : filteredId,
                lists : filelist,
                desc : description
            });
        });
    });
});

module.exports = router;