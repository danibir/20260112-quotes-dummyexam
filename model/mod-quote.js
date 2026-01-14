const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = new Schema({
    quote: {
        type: String, 
        required: true, 
        unique: true
    },
    creator: {
        type: String, 
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    dislikes: {
        type: Array,
        default: []
    },
    quoteId: {
        type: Number,
        default: 0,
        unique: true
    }
})

quoteSchema.pre('validate', async function () {
    const Quote = this.constructor
    let unique = false
    while (unique == false) {
        const digits = 12
        const min = Math.pow(10, digits - 1)
        const max = Math.pow(10, digits) - 1
        const candidate = Math.floor(Math.random() * (max - min + 1)) + min
        const exists = await Quote.findOne({ quoteId: candidate })
        if (!exists) {
            this.quoteId = candidate
            unique = true
        }
    }
})

const Quote = mongoose.model('Quote', quoteSchema, 'quotes')
module.exports = Quote