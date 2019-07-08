const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../api/v1/models/User.js');
const config = require('./config');

module.exports = function(passport) {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromExtractors(
        [
            ExtractJwt.fromAuthHeaderAsBearerToken()
        ]
    );
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        if (config.roles[jwt_payload.role])
            User.findById(jwt_payload._id, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        else {
            done(null, false);
        }
    }));
};