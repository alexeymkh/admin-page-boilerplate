let errors = require('../../../../config/errors');
const User = require('../../models/User');

let list = async (req, res, next) => {
    try {   

        let query = {};

        let p = parseInt(req.query.page);
        let l = parseInt(req.query.limit);
        const sortKey = req.query.sortkey ? req.query.sortkey : "created_at";
        let o = parseInt(req.query.order);  

        if (!Number.isInteger(p) || p < 1) p = 1;
        if (!Number.isInteger(l) || l < 1) l = 10;
        if (!Number.isInteger(o)) o = -1;

        let sort = {};
        sort[sortKey] = o;

        let options = {
            page: p,
            limit: l,
            sort: sort,
            select: '-password'
        }

        let rmp = await User.paginate(query, options);

        rmp.docs.forEach( user => {
          user.password = undefined;
        })
        
        return res.json( User.paginationWrapper(`users`, rmp, null) );
    }
    catch (err){
      console.log(err);
      next( errors.internalServerError );
    }
}
module.exports = list;