const axios = require('axios')

const BEARER_TOKEN = "" // The Token

async function getUserId(username) {
    try {
        const response = await axios.get(`https://api.twitter.com/2/users/by/username/${username}`, {
            headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
        })
        if (response.data && response.data.data && response.data.data.id) {
            return response.data.data.id
        } else {        
            return null
        }
    } catch (error) {
        throw new Error('Failed to fetch user ID')
    }
}
  
async function getLatestTweet(username) {
    try {
        const userId = await getUserId(username);
        if (!userId) throw new Error('User ID not found for the given username.')
        const response = await axios.get(`https://api.twitter.com/2/users/${userId}/tweets`, {
            headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
            params: { max_results: 5 }
        })
        if (response.data && response.data.data && response.data.data.length > 0) {
            return response.data.data
        } else {
            return []
        }
    } catch (error) {
        throw new Error('Failed to fetch the latest tweet')
    }
}

module.exports = { getLatestTweet }