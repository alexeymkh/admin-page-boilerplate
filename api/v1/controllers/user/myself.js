let errors = require('../../../../config/errors');

let get = async (req, res, next) => {
  try {
    req.user.password = undefined;
    return res.json(req.user);
  }
  catch (err){
    console.log(err);
    next( errors.internalServerError );
  }
}
module.exports = get;