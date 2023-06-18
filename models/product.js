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
    }
});

export default mongoose.models.Product || mongoose.model('Product',productSchema);