const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    },
    message: String,
    notificationDate: {
        type: Date,
        default: Date.now
    },
    wasRead: Boolean
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;