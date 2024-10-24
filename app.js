const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const customerRoute = require("./routes/customer")
const cors = require("cors")
const methodOverride = require('method-override')

var app = express()

app.set("view engine", "ejs")

mongoose.connect('mongodb://localhost:27017/OurStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err))


app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

// Root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.use("/customers", customerRoute)

app.use(express.static("public"))


app.listen(80)