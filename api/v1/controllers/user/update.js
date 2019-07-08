let errors = require('../../../../config/errors');

let update = async (req, res, next) => {
  try {

      const {       
          userName,
          email,
          password,
          role
      } = req.body;

      let changes = 0;

      if (userName && userName != req.foundUser.userName) 
          { req.foundUser.userName = userName; changes++; }
          
      if (email && email != req.foundUser.email) 
          { req.foundUser.email = email; changes++; }

      if (password) 
          { req.foundUser.password = password; changes++; }

      if (role && role != req.foundUser.role) 
          { req.foundUser.role = role; changes++; }    

      if (changes > 0)
        await req.foundUser.save().then(null, function (err) { 
          if (err) throw err;
        });

      res.status(200).send({ success: true });
  }
  catch (err){
    console.log(err);
    next( errors.internalServerError );
  }
}
module.exports = update;