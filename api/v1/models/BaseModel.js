const mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

module.exports = ModelSchema => {
    const Model = new Schema({
        ...ModelSchema,
        _id: Schema.Types.ObjectId,
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    });

    Model.plugin(mongoosePaginate);

    Model.statics.paginationWrapper = function (name, rmp, err) { // rmp - mongoosePaginate`s result, name - name of collection
        let result = {};
        result.success = err ? false : true;
        result.error = err;
        result[name] = rmp.docs;
        result.currentPage = rmp.page;
        result.nextPage = rmp.page >= rmp.pages ? null : (rmp.page + 1);
        result.currentSize = rmp.docs.length;
        result.limit = rmp.limit;
        result.totalDocs = rmp.total;
        result.totalPages = rmp.pages;
        return result;
    };


    Model.pre('save', function (next) {
        this.updated_at = Date.now();

        next();
    });

    return Model;
}