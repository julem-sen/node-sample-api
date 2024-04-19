const bcrypt = require('bcrypt');

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class Customer {
    constructor(customer_id, customer_name, customer_email, customer_password, customer_phone,
        created_at, updated_at, deleted_at) {
        return new Promise((resolve, reject) => {
            if (!customer_name || !customer_email || !customer_password || !customer_phone) {
                reject(new ValidationError('All fields are required'));
            }
    
            if (typeof customer_name !== 'string' || customer_name.length < 4) {
                reject(new ValidationError('Name must be a string and at least 4 characters long'));
            }
    
            if (!this.validateEmail(customer_email)) {
                reject(new ValidationError('Email is not valid'));
            }
    
            if (!this.validateContact(customer_phone)) {
                reject(new ValidationError('Contact must start with 0 or +63'));
            }
            
            bcrypt.hash(customer_password, 10)
                .then(hash => {
                    resolve({
                        customer_id: customer_id,
                        customer_name: customer_name,
                        customer_email: customer_email,
                        customer_password: hash,
                        customer_phone: customer_phone,
                        created_at: created_at,
                        updated_at: updated_at,
                        deleted_at: deleted_at
                    });
                })
                .catch(err => {
                    reject(err);
                });
        })        
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateContact(contact) {
        const re = /^(0|\+63)9\d{9}$/;
        return re.test(contact);
    }
}

module.exports = Customer;