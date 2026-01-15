

const Quote = require("../model/mod-quote")

const index_get = async (req, res) => {
    let quotes = await Quote.find({})

    let currentIndex = quotes.length
    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [quotes[currentIndex], quotes[randomIndex]] = [
        quotes[randomIndex], quotes[currentIndex]]
    }
    quotes = quotes.slice(0, 10)

    res.render('index', { user: req.session.user || NaN, quotes})
}

module.exports = {
    index_get
}