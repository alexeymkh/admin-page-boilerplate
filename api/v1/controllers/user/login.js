let errors = require('../../../../config/errors');
const User = require('../../models/User');

let login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user && await user.comparePassword(password)) {
            const token = user.generateJwt();
            return res.json({ success: true, token });
        }
        else
            next( errors.authFailed );
    } catch (err) {
        console.log(err);
        next( errors.internalServerError );
    }
}
module.exports = login;