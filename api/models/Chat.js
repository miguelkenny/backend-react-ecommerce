import mongoose from "mongoose";

class ChatSchema extends mongoose.Schema {
    constructor() {
        const chatSchema = super(
            {
                message: { type: String },
                username: { type: String },
                position: { type: String },
            },
            { timestamps: true }
        )
        return chatSchema
    }
}

export default mongoose.model('Chat', new ChatSchema);