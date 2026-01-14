


const index_get = (req, res) => {
    res.render('index', { user: req.session.user || NaN })
}

module.exports = {
    index_get
}