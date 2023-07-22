const mongoose = require('mongoose')

const connectDB = async (uri) => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(uri, console.log('connexion établie !'))
    } catch (err) {
        console.error(err)
        process.exit()
    }
}

module.exports = connectDB