var fs = require('fs');
var path = require('path');
var { Router } = require('express');
var router = Router();

// nav.html 파에서 post방식으로 /delete/delete_process 경로로 보내면 
// 여기서 받아서 req, res일들을 처리한다.
router.post('/delete_process', function(req, res) {
    var post = req.body;
    var id = post.id;
    var filtereId = path.parse(id).base;
    fs.unlink(`data/${filtereId}`, function(error){
        res.redirect('/');
    });
});

module.exports = router;