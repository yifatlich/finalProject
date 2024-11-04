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
    const apiKey = "9f393640c52d4a2cab1110740240411" // The API Key
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

// exports.getWeather = async (req, res) => {
//     const location = req.query.location || "New York" // Default location or take from query
//     const apiKey = "9f393640c52d4a2cab1110740240411"
//     const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`

//     try {
//         const response = await fetch(apiUrl)
//         const data = await response.json()

//         if (data.error) {
//             return res.render("weather", { error: data.error.message })
//         }

//         res.render("weather", {
//             location: data.location.name,
//             temperature: data.current.temp_c,
//             condition: data.current.condition.text,
//             icon: data.current.condition.icon,
//         })
//     } catch (err) {
//         console.error("Error fetching weather data:", err)
//         res.render("weather", { error: "Unable to fetch weather data" })
//     }
// }
