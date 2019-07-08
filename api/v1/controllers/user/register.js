let errors = require('../../../../config/errors');
const mongoose = require('mongoose');
const User = require('../../models/User');

let create = async (req, res, next) => {
  try {
    
    const { 
      userName,
      email,
      password,
      role
    } = req.body;

    let newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      userName,
      email,
      role,
      password
    });

    await newUser.save().then(null, function (err) { 
      if (err) throw err;
    });

    res.status(200).send({ success: true, message: "Ok" });
  }
  catch (err){
    console.log(err);
    next( errors.internalServerError );
  }
}
module.exports = create;