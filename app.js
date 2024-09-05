const express = require("express")
const { default: mongoose } = require("mongoose")

require("custom-env").env(process.env.NODE_ENV, "./config")

mongoose.connect(process.env.CONNECTION_STRING,
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.listen(process.env.PORT)