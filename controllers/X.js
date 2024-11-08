require('dotenv').config(); // ���� �� ����� ������ ������ .env
const { TwitterApi } = require('twitter-api-v2');

// ����� ����� �� ������� ��� �������
const client = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
});

// ������� ������ ������ ��� �� ����� �-API V1.1
async function getTweets(req, res) {
    try {
        const username = req.params.username; // ���� �� �� ������ ������

        // ����� ������ ���������� V1.1 �� ������
        const userTimeline = await client.v1.get('statuses/user_timeline.json', {
            screen_name: username, // �� ������ �������
            count: 5, // ���� ������� �����
            tweet_mode: 'extended', // ���� �� ������� ������ ��� �������
        });

        // ����� ������� �����
        res.json(userTimeline);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ error: 'Error fetching tweets' });
    }
}

module.exports = { getTweets };
