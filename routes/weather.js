const express = require("express")
const router = express.Router()
const weatherController = require("../controllers/weather")

router.get("/weather", weatherController.getWeatherForm)
router.post("/weather", weatherController.getWeatherData)

module.exports = router
