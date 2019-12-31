var { Router } = require('express');
var router = Router();

router.get('/productes/write', function(_, res){
    res.render('admin/form.html');
});
 
module.exports = router;