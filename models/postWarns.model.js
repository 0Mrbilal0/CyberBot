const  mongoose  = require("mongoose")

const postWarns = mongoose.Schema(
    {
        targetId: {
            type: String,
            required: true
        },
        targetUsername: {
            type: String,
            required: true
        },
        reason: {
            type: String,
            required: false,
        },
        author: {
            type: String,
            required: true,
        },
    }
)

module.exports = mongoose.model('warns', postWarns)