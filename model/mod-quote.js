const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = new Schema({
    quote: 
    {
        type: String, 
        required: true, 
        unique: true
    },
    creator: 
    {
        type: String, 
        required: true
    }
})

const Quote = mongoose.model('Quote', quoteSchema, 'quotes')
module.exports = Quote