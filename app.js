const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const customerRoute = require("./routes/customer")
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const addressRoute = require("./routes/address")
const storeRoute = require("./routes/store")
const supplierRoute = require("./routes/suppliers")

const cors = require("cors")
const methodOverride = require('method-override')
const path = require('path')

var app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs")

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

// Root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.use("/customers", customerRoute)
app.use("/products", productRoute);
app.use('/cart', cartRoute);
app.use(addressRoute)
app.use(storeRoute)
app.use(supplierRoute)



app.listen(80)