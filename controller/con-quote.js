const func = require('../js/functions')
const Quote = require("../model/mod-quote")



const scroll_get = async (req, res) => {
    let quotes = await Quote.find({})

    let currentIndex = quotes.length
    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [quotes[currentIndex], quotes[randomIndex]] = [
        quotes[randomIndex], quotes[currentIndex]]
    }

    res.render('quotescroll', { user: req.session.user || NaN, quote: quotes[0] })
}
const create_get = (req, res) => {
    if (req.session.user)
    {
        res.render('quotecreate', { user: req.session.user, data: {}, quote: "" })
    }
    else
    {
        res.redirect('/user/login')
    }
}
const create_post = async (req, res) => {
    if (req.session.user)
    {
        const quote = req.body.quote
        const occupied = await Quote.findOne({ quote })
        if (quote.length > 100) {
            data = {}
            func.responseMessage(data, "errormsg", `Your quote is too long and boring and exceded 100 characters. (${quote.length})`, "bad")
            res.render('quotecreate', { user: req.session.user, data, quote })
        } else if (!occupied) {
            let newQuote = req.body
            newQuote.creator = req.session.user.username
            newQuote = new Quote(newQuote)
            await newQuote.save()
            res.redirect(`/user/profile:${req.session.user.username}`)
        } else {
            data = {}
            func.responseMessage(data, "errormsg", "This is already a quote... try writing something ORIGINAL for a change...", "bad")
            res.render('quotecreate', { user: req.session.user, data, quote })
        }
    }
    else
    {
        res.redirect('/user/login')
    }
}
const delete_post = async (req, res) => {
    let id = req.params.id
    id = Number(id.slice(1))
    await Quote.findOneAndDelete({ quoteId: id })
    res.redirect('/')
}

module.exports = {
    scroll_get,
    create_get,
    create_post,
    delete_post
}