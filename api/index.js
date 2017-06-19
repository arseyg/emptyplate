var express = require('express');
var router = express.Router();

router.get('/noun', function(req, res, next) {
 	//res.send('respond with a resource');
 	res.json({one: 'two', three: 'four'});
});

module.exports = router;