const  mongoose  = require("mongoose")

const postSchema = mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true,
          },
    }
)

const postConfig = mongoose.Schema(
    {
        salonFortnite: {
            type: String,
            required: false
        },
        salonlogs: {
            type: String,
            required: false
        }
    }
)

module.exports = mongoose.model('salonfortnite', postConfig)
module.exports = mongoose.model('message', postSchema)