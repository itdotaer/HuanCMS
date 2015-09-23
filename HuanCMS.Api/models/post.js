var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    content: {type: String, required: true},
    classId: {type: Schema.ObjectId, ref: 'Class'},
    createdAt: {type: Date, default: Date.now},
    createdBy: {type: Schema.ObjectId, ref: 'User'},
    updatedAt: {type: Date, default: Date.now},
    updatedBy: {type: Schema.ObjectId, ref: 'User'}
});

mongoose.model('Post', PostSchema);
