var fs = require('fs');
var { Router } = require('express');
var router = Router();

router.get('/', function(req, res){
    res.render('page/create/create.html')
});

// html 파에서 post방식으로 /create/create_process 경로로 보내면 
// 여기서 받아서 req, res일들을 처리한다.
router.post('/create_process', function(req, res){   //글 작성 라우터 구현
    var post = req.body
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function(error){
        res.redirect('/')
    });
});

module.exports = router;