var { Router } = require('express');
var router = Router();

router.get('/', function(_, res){
    res.render('page/about/info.html');
});
 
module.exports = router;