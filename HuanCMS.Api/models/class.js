var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    parentId: {type : String, required: true},
    createdAt: {type: Date, default: Date.now},
    createdBy: {type: Schema.ObjectId, ref: 'User'},
    updatedAt: {type: Date, default: Date.now},
    updatedBy: {type: Schema.ObjectId, ref: 'User'}
});

ClassSchema.index({name: 1}, {unique: true});

mongoose.model('Class', ClassSchema);
