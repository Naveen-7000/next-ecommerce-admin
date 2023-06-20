import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    images:[{
        type:String,
    }],
    category:{
        type:mongoose.Types.ObjectId,
        ref:'Category'
    },
    properties: {type:Object},
});

export default mongoose.models.Product || mongoose.model('Product',productSchema);