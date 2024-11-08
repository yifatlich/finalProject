const axios = require("axios")

const locations = [
    { name: "New York", value: "New York" },
    { name: "Los Angeles", value: "Los Angeles" },
    { name: "Chicago", value: "Chicago" },
]


const getWeatherForm = (req, res) => {
    res.render("weather", { locations })
}

const getWeatherData = async (req, res) => {
    const { location } = req.body
    const apiKey = "" // API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`

    try {
        const response = await axios.get(url)
        const weatherData = response.data
        res.render("weatherResult", { weatherData })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Error fetching weather data" })
    }
}

module.exports = {
    getWeatherForm,
    getWeatherData,
    locations,
}