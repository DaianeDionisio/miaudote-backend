const twilio = require('twilio');

require('dotenv').config();

const ACCOUNT_SID = process.env.Whatsapp_ACCOUNT_SID;
const AUTH_TOKEN = process.env.Whatsapp_AUTH_TOKEN;
const PHONE_NUMBER = process.env.Whatsapp_PHONE_NUMBER;

console.log(ACCOUNT_SID)

const client = new twilio(ACCOUNT_SID, AUTH_TOKEN);


exports.sendWhatsAppMessage = function (req, res) {
    const to = req.body.to;
    const message = req.body.message;

    client.messages
        .create({
            from: 'whatsapp:' + PHONE_NUMBER,
            body: message,
            to: 'whatsapp:' + to
        })
        .then(message => {
            res.send(`Mensagem enviada com ID ${message.sid}`);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};