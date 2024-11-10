const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const TELEGRAM_BOT_TOKEN = '7397784540:AAG42pZnEwldDG3mNYpZBSDq73HChz7wzqQ';
const TELEGRAM_CHAT_ID = '-1002356792899'; // Cập nhật với chat_id của bạn

app.get('/getPosts', async (req, res) => {
    try {
        const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
        const messages = response.data.result.filter(update => update.message && update.message.chat.id == TELEGRAM_CHAT_ID);
        const posts = messages.map(message => ({
            title: message.message_id,
            image: message.message.photo ? `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${message.message.photo[0].file_id}` : null,
            link: message.message.text
        }));
        res.json(posts);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
