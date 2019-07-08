let express = require('express');
let router = express.Router();

const user = require('./user');

router.use('/user', user);

module.exports = router;