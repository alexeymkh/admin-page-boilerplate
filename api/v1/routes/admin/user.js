let express = require('express');
let router = express.Router();

const list = require('../../controllers/user/list');
const get = require('../../controllers/user/get');
const myself = require('../../controllers/user/myself');
const register = require('../../controllers/user/register');
const update = require('../../controllers/user/update');
const stop = require('../../controllers/user/stop');
const start = require('../../controllers/user/start');
const deleteUser = require('../../controllers/user/delete');

const validation = require('../../middlewares/validation/user');

router.get('/', list);
router.get('/myself', myself);
router.get('/:id', validation.get(), get);
router.post('/', validation.register(), register);
router.put('/:id', validation.update(), update);
router.put('/:id/stop', validation.stop(), stop);
router.put('/:id/start', validation.start(), start);
router.delete('/:id', validation.delete(), deleteUser);


module.exports = router;
