const mongoose = require("mongoose")

const postConfig = mongoose.Schema(
    {
        serverId:{
            type: String,
            unique: true,
            required: true
        },
        logschannel: {
            type: String,
            required: false
        },
        warnsKick: {
            type: String,
            required: false
        },
        warnsBan: {
            type: String,
            required: false
        },
        warnsTempBan: {
            type: String,
            required: false
        }
    }
)

module.exports = mongoose.model('config', postConfig)