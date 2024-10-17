const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
    created_at: { type: Date, default: Date.now },
    category:{ type: ObjectId, ref:'Category' },
})

module.exports = mongoose.model('product', ProductSchema);