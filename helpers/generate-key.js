const crypto = require('crypto');

module.exports = {
    generateKey: () => {
        const secretKey = crypto.randomBytes(32).toString('hex');
        return secretKey;
    },

    generateId: () => {
        const today = new Date();
        const bookingId = 'MC' + 
                        today.getFullYear() + 
                        today.getMonth() + 
                        today.getDate() + 
                        today.getHours() + 
                        today.getMinutes() + 
                        today.getSeconds(); 
        return bookingId;
    }
}