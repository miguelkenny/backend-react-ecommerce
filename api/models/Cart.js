import mongoose from "mongoose";

class CartSchema extends mongoose.Schema {
    constructor() {
        const cartSchema = super({
            products: [{
                _id: { type: String },
                title: { type: String }
            }],
            quantity: { type: Number, default: 1 },
            total: { type: Number, default: 0 }
        },
            { timestamps: true }
        )
        return cartSchema
    }
}

export default mongoose.model('Cart', new CartSchema)