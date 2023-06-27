import {model, Schema, models} from 'mongoose';

const FeaturedSchema = new Schema({
    product : {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
});

export const Featured =  models.Featured || model('Featured', FeaturedSchema);