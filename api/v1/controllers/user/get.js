let errors = require('../../../../config/errors');

let get = async (req, res, next) => {
  try {
      return res.json({ success: true, user: req.foundUser });
  }
  catch (err){
    console.log(err);
    next( errors.internalServerError );
  }
}
module.exports = get;