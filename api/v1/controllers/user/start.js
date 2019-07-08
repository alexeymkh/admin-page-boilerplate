let errors = require('../../../../config/errors');
let config = require('../../../../config/config');

let start = async (req, res, next) => {
  try {
    req.foundUser.status = config.userStatuses.active;
    await req.foundUser.save();

    return res.json({ success: true })
  }
  catch (err){
    console.log(err);
    next( errors.internalServerError );
  }
}
module.exports = start;