let errors = require('../../../../config/errors');
const User = require('../../models/User');

let deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await User.deleteOne({ _id: id });
    return res.json({ success: true });
  }
  catch (err){
    console.log(err);
    next( errors.internalServerError );
  }
}
module.exports = deleteUser;