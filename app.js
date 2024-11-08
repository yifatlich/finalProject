const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const session = require('express-session')
const flash = require('connect-flash')
const customerRoute = require("./routes/customer")
const managerRoute = require("./routes/manager")
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const addressRoute = require("./routes/address")
const storeRoute = require("./routes/store")
const weatherRoute = require("./routes/weather")
const loginRoute = require('./routes/login')
const expressEjsLayouts = require('express-ejs-layouts');
const statisticsRoute = require('./routes/statistics')
const twitterRoute = require('./routes/twitter')
const checkoutRoute = require("./routes/checkout");



const cors = require("cors")
const methodOverride = require('method-override')
const path = require('path')

var app = express()


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: '12345678901234567890', resave: false, saveUninitialized: true, cookie: { secure: false } }))
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));



app.use(expressEjsLayouts);


app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost:27017/OurStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err))


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())

app.use((req, res, next) => {
    res.locals.messages = req.flash('error')
    next()
})
//app.use(express.static(path.join(__dirname, 'css')));

// Root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.use("/customers", customerRoute)
app.use("/managers", managerRoute)
app.use("/products", productRoute)
app.use('/cart', cartRoute)
app.use(addressRoute)
app.use(storeRoute)
app.use(weatherRoute)
app.use('/login', loginRoute)
app.use(statisticsRoute)
app.use('/twitter', twitterRoute)
app.use('/checkout', checkoutRoute)




app.listen(80)