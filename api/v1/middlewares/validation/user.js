let errors = require('../../../../config/errors');
let { roles } = require('../../../../config/config');
const moment = require('moment');
const { check, param, validationResult } = require('express-validator/check');
const User = require('../../models/User');

// TODO string validation

module.exports.register = (req, res, next) => {
    return [
        check('userName')
            .trim()
            .not().isEmpty().withMessage('Field "userName" is required')
            .not().isJSON().withMessage('Field "userName" type should be String')
            .custom(value => {
                return User.findOne({ userName: value }).then(user => {
                    if (user) {
                        return Promise.reject();
                    }
                });
            }).withMessage('userName is already in use'),
        //
        check('role')
            .trim()
            .not().isEmpty().withMessage('Field "role" is required')
            .not().isJSON().withMessage('Field "role" type should be String')
            .custom(value => {
                if (!roles[value]) 
                    return Promise.reject();
                else
                    return Promise.resolve();
            }).withMessage('Unknown role'),
        //
        check('email')
            .trim()
            .not().isEmpty().withMessage('Field "email" is required')
            .normalizeEmail()
            .isEmail().withMessage('Email is not valid')
            .custom(value => {
                return User.findOne({ email: value.toLowerCase() }).then(user => {
                    if (user) {
                        return Promise.reject();
                    }
                });
            }).withMessage('E-mail is already in use'),
        //
        check('password')
            .trim()
            .not().isEmpty().withMessage('Field "password" is required')
            .isLength({ min:8, max: undefined }).withMessage('Passwords must be at least 8 chars long'),
        //
        check('passwordConfirmation', req)
            .trim()
            .not().isEmpty().withMessage('Field "passwordConfirmation" is required')
            .custom( (value, req) => {
                if (value !== req.req.body.password) {
                    return Promise.reject();
                }
                else return Promise.resolve();
            }).withMessage('Password confirmation does not match password'),
        //
        async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) 
            next(errors.badRequest( err.array() ));
        else 
            next();
        }
    ];
};


module.exports.login = (req, res, next) => {
    return [
        check('email')
            .trim()
            .not().isEmpty().withMessage('Field "email" is required')
            .normalizeEmail()
            .isEmail().withMessage('Email is not valid'),
        //
        check('password')        
            .not().isEmpty().withMessage('Field "password" is required')
            .trim()
            .isLength({ min:8, max: undefined }).withMessage('Passwords must be at least 8 chars long'),
        //
        async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) 
            next(errors.badRequest( err.array() ));
        else 
            next();
        }
    ];
};

module.exports.update = (req, res, next) => {
    return [
        param('id')
            .isMongoId().withMessage('User ID is not valid')
            .custom((value, req) => {
                return User.findById(value).select(`-password`).then(user => {
                    if (!user) {
                        return Promise.reject();
                    }
                    else req.req.foundUser = user;
                });
            }).withMessage('User not exists'),
        //
        check('userName')
            .trim()
            .optional()
            .custom((value, req) => {
                return User.findOne({ userName: value }).then(user => {
                    if (user && user._id != req.req.params.id) {
                        return Promise.reject();
                    }
                });
            }).withMessage('userName is already in use'),
        //
        check('role')
            .trim()
            .optional()
            .custom(value => {
                if (!roles[value]) 
                    return Promise.reject();
                else
                    return Promise.resolve();
            }).withMessage('Unknown role'),
        //
        check('email')
            .trim()
            .optional()
            .normalizeEmail()
            .isEmail().withMessage('Email is not valid')
            .custom((value, req) => {
                return User.findOne({ email: value.toLowerCase() }).then(user => {
                    if (user && user._id != req.req.params.id) {
                        return Promise.reject();
                    }
                });
            }).withMessage('E-mail is already in use'),
        //
        check('password')
            .trim()
            .optional()
            .isLength({ min:8, max: undefined }).withMessage('Passwords must be at least 8 chars long'),
        //
        check('passwordConfirmation', req)
            .trim()
            .optional()
            .custom( (value, req) => {
                if (req.req.body.password && value !== req.req.body.password) {
                    return Promise.reject();
                }
                else return Promise.resolve();
            }).withMessage('Password confirmation does not match password'),
        //
        
        async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) 
            next(errors.badRequest( err.array() ));
        else 
            next();
        }
    ];
};

module.exports.get = (req, res, next) => {
    return [
        param('id')
            .isMongoId().withMessage('User ID is not valid')
            .custom((value, req) => {
                return User.findById(value).select(`-password`).then(user => {
                    if (!user) {
                        return Promise.reject();
                    }
                    else req.req.foundUser = user;
                });
            }).withMessage('User not exists'),
        //

        async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) 
            next(errors.badRequest( err.array() ));
        else 
            next();
        }
    ];
};

module.exports.delete = (req, res, next) => {
    return [
        param('id')
            .isMongoId().withMessage('User ID is not valid')
            .custom((value, req) => {
                return User.findById(value).then(user => {
                    if (!user) {
                        return Promise.reject();
                    }
                    else req.req.foundUser = user;
                });
            }).withMessage('User not exists'),
        //

        async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) 
            next(errors.badRequest( err.array() ));
        else 
            next();
        }
    ];
};

module.exports.stop = (req, res, next) => {
    return [
        param('id')
            .isMongoId().withMessage('User ID is not valid')
            .custom((value, req) => {
                return User.findById(value).then(user => {
                    if (!user) {
                        return Promise.reject();
                    }
                    else req.req.foundUser = user;
                });
            }).withMessage('User not exists'),
        //

        async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) 
            next(errors.badRequest( err.array() ));
        else 
            next();
        }
    ];
};

module.exports.start = (req, res, next) => {
    return [
        param('id')
            .isMongoId().withMessage('User ID is not valid')
            .custom((value, req) => {
                return User.findById(value).then(user => {
                    if (!user) {
                        return Promise.reject();
                    }
                    else req.req.foundUser = user;
                });
            }).withMessage('User not exists'),
        //

        async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) 
            next(errors.badRequest( err.array() ));
        else 
            next();
        }
    ];
};