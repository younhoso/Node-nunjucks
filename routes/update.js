var fs = require('fs');
var path = require('path');
var qs = require('query-string');
var { Router } = require('express');
var router = Router();

router.get('/:pageId', function(req, res){
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(error, description){
        res.render('page/update/update.html',{
            tit : req.params.pageId,
            desc : description
        })
    });
});

// html 파에서 post방식으로 /update/update_process 경로로 보내면 
// 여기서 받아서 req, res일들을 처리한다.
router.post('/update_process', function(req, res) {
    var body = '';
    req.on('data', function(data){
        body = body + data;
        console.log(body)
    });
    req.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                res.redirect(`/?id=${title}`);
            });
        });
    });
});

module.exports = router;