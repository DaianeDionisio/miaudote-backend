const twilio = require('twilio');

const ACCOUNT_SID = 'AC199ad4c60f76425aff0645a88289f7fa';
const AUTH_TOKEN = '822be49c461ad2d92e4c2da46292a986';
const PHONE_NUMBER = "+14155238886";
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