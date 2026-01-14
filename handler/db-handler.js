const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://10.12.15.42:27017/quotesdata')
        console.log('mongoDB connected successfully')
        return true
    } catch (err) {
        console.error('mongoDB connection error:', err)
        return false
    }   
}

module.exports = {
    connectDB
}