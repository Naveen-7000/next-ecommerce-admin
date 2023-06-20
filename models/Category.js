import mongoose from "mongoose";
const { Schema } = require("mongoose");

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    parent:{
        type: mongoose.Types.ObjectId,
        ref : 'Category',
    },
    properties:[{type:Object}],
})

module.exports = mongoose.models.Category || mongoose.model('Category',CategorySchema);