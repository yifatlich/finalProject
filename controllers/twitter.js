const twitterService = require('../services/twitter')
const TwitterUsername = require('../models/twitter')

async function showLatestTweet(req, res) {
    try {
        const usernames = await TwitterUsername.find()
        const tweets = []
        for (const user of usernames) {
            const username = user.username
            const userTweets = await twitterService.getLatestTweet(username)
            tweets.push({ username, tweets: userTweets })
        }
        res.render('twitter', { tweets, error: null })
    } catch (error) {
        console.error('Error fetching tweets:', error.message)
        res.render('twitter', { tweets: [], error: error.message })
    }
}

async function getUsernames (req, res) {
    try {
        const usernames = await TwitterUsername.find()
        res.render('twitterConfig', { usernames })
    } catch (error) {
        res.status(500).send('Error retrieving usernames')
    }
}

async function addUsername (req, res) {
    const { username } = req.body
    try {
        const existingUser = await TwitterUsername.findOne({ username })
        if (existingUser) {
            return res.status(400).send('Username already exists')
        }
        const newUsername = new TwitterUsername({ username })
        await newUsername.save()
        res.redirect('/twitter/config')
    } catch (error) {
        res.status(500).send('Error adding username')
    }
}
  
async function removeUsername (req, res) {
    const { username } = req.body;
    try {
      await TwitterUsername.findOneAndDelete({ username });
      res.redirect('/twitter/config'); // Redirect to list of usernames
    } catch (error) {
      res.status(500).send('Error removing username');
    }
}

module.exports = { 
    showLatestTweet, 
    getUsernames,
    addUsername,
    removeUsername
}