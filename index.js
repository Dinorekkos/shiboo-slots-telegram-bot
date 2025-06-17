const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const TOKEN = process.env.BOT_TOKEN; // desde las variables de entorno
const GAME_SHORT_NAME = 'shibooSlotsGame';
const GAME_URL = 'https://dinorekkosgd.itch.io/shiboo-game-test'; // Cambia por tu URL real HTTPS

const bot = new TelegramBot(TOKEN, { polling: true });

// Responde a /start o /play con el juego
bot.onText(/\/(start|play)/, (msg) => {
  bot.sendGame(msg.chat.id, GAME_SHORT_NAME);
});

// Responde a inline query (cuando escriben @shibooSlotsBot en cualquier chat)
bot.on('inline_query', (query) => {
  bot.answerInlineQuery(query.id, [{
    type: 'game',
    id: GAME_SHORT_NAME,
    game_short_name: GAME_SHORT_NAME
  }]);
});

// Abre el juego cuando el usuario da click en el botón "Play"
bot.on('callback_query', (callbackQuery) => {
  bot.answerCallbackQuery(callbackQuery.id, {
    url: GAME_URL
  });
});

// Express server para mantener el bot vivo en Render
const app = express();
app.get('/', (req, res) => {
  res.send('Shiboo Slots Bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
