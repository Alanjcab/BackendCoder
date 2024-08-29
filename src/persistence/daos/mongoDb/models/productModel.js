import {Schema, model} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ProductSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
})
ProductSchema.plugin(mongoosePaginate);

export const ProductModel = model(
    "products",
    ProductSchema
);