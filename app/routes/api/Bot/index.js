const express = require('express');
const bodyParser = require('body-parser');
const apiai = require('apiai');
const bot = require('../../../services/bot/bot');
const botErrors = require('../../../services/shared/Strings')
  .botErrors;

const router = express.Router();

const ai = apiai(process.env.API_AI_TOKEN);

/**
 * BodyParser Middleware.
 */
router.use(bodyParser.json());

/**
 * Initialize Facebook Webhook.
 */
router.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid verify token');
  }
});

/**
 * Listen to Facebook Events Webhook.
 */
router.post('/webhook', (req, res) => {
  req.body.entry.forEach((entry) => {
    entry.messaging.forEach((messaging) => {
      if (messaging.message && messaging.message.text) {
        const senderID = messaging.sender.id;

        bot.sendTyping(senderID);

        const apiRequest = ai.textRequest(messaging.message.text, {
          sessionId: senderID,
        });

        let text;
        apiRequest.on('response', (response) => {
          switch (response.result.action) {
            case 'Search':
              {
                const query = {
                  name: response.result.parameters.name,
                  location: response.result.parameters.location,
                  category: response.result.parameters.category,
                  min: response.result.parameters.minPrice.number,
                  max: response.result.parameters.maxPrice.number,
                };
                bot.Search(senderID, query);
                break;
              }
            default:
              {
                text = response.result.fulfillment.speech;
                bot.sendMessage(senderID, {
                  text,
                });
                break;
              }
          }
        });

        apiRequest.on('error', () => {
          bot.sendMessage(senderID, {
            text: botErrors.generalError,
          });
        });

        apiRequest.end();
      }
    });
  });
  res.sendStatus(200);
});

module.exports = router;
