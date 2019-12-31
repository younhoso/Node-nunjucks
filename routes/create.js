var fs = require('fs');
var path = require('path');
var qs = require('query-string');
var { Router } = require('express');
var router = Router();

router.get('/', function(req, res){
    res.render('page/create/create.html')
});

router.post('/create_process', function(req, res){   //글 작성 라우터 구현
    var body = '';
    req.on('data', function(data){
        body = body + data;
    });
    req.on('end', function() {
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.readdir('./data', function(error, filelist){ 
            fs.writeFile(`data/${title}`, description, 'utf8', function(error){
                res.render('index.html',{
                    tit: title,
                    desc: description
                });
            });
        });
    });
});

module.exports = router;