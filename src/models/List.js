const mongoose = require('mongoose');
const {Schema, models } = mongoose;

const listSchema = new Schema({
    title: { type: String, required: true },
    descripcion: {type: String, required: true},
    
    item1: {type: String},
    item2: {type: String},
    item3: {type: String},
    item4: {type: String},
    item5: {type: String},
    date: {type: Date, default: Date.now},
    user:{type: String, required: true },
    filename: { type: String},
    path: { type:String },
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number },

},{
    timestamps: true
}
);

module.exports = mongoose.model('List', listSchema);