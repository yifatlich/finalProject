require('dotenv').config(); // טוען את משתני הסביבה מהקובץ .env
const { TwitterApi } = require('twitter-api-v2');

// יצירת חיבור עם המפתחות שלך מהסביבה
const client = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
});

// פונקציה לשליפת ציוצים לפי שם משתמש ב-API V1.1
async function getTweets(req, res) {
    try {
        const username = req.params.username; // מקבל את שם המשתמש מהבקשה

        // שליפת ציוצים מהאנפפוינט V1.1 של טוויטר
        const userTimeline = await client.v1.get('statuses/user_timeline.json', {
            screen_name: username, // שם המשתמש בטוויטר
            count: 5, // מספר הציוצים לשלוף
            tweet_mode: 'extended', // לקבל את הציוצים המלאים ולא מקוצרים
        });

        // החזרת הציוצים ללקוח
        res.json(userTimeline);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ error: 'Error fetching tweets' });
    }
}

module.exports = { getTweets };
