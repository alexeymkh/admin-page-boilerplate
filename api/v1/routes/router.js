let express = require('express');
let router = express.Router();

let admin = require('./admin/router');

const userLogin = require('../controllers/user/login');
const userRegister = require('../controllers/user/register');
const userValidation = require('../middlewares/validation/user');

const passport = require('passport');
require('../../../config/passport.js')(passport);

router.get('/', function (req, res) { res.send('index') });

router.post('/admin/login', userValidation.login(), userLogin);
router.post('/admin/', userValidation.register(), userRegister);

router.use(passport.authenticate('jwt', { session: false }));
router.use('/admin', admin);

module.exports = router;