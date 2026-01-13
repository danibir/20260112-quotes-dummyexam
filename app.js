const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000

const db = require('./handler/db-handler')

const router = require('./router/rou-default')
const router_user = require('./router/rou-user')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
}));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

db.connectDB()
    .then(()=>{
        console.log('Connected!')
        app.listen(3000)


        app.use('/', router)
        app.use('/', router_user)
    })
    .catch(()=>{
        app.use(()=>{
            res.write('Unable to contact database...')
            res.end()
        })
    })