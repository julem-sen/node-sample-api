const bcrypt = require('bcrypt');

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class User {
    constructor(Id, Name, Email, Password, Contact, Updated_At, Deleted_At) {
        return new Promise((resolve, reject) => {
            if (!Name || !Email || !Password || !Contact) {
                reject(new ValidationError('All fields are required'));
            }
    
            if (typeof Name !== 'string' || Name.length < 3) {
                reject(new ValidationError('Name must be a string and at least 3 characters long'));
            }
    
            if (!this.validateEmail(Email)) {
                reject(new ValidationError('Email is not valid'));
            }
    
            if (!this.validateContact(Contact)) {
                reject(new ValidationError('Contact must start with 0 or +63'));
            }
            
            bcrypt.hash(Password, 10)
                .then(hash => {
                    resolve({
                        Id: Id,
                        Name: Name,
                        Email: Email,
                        Password: hash,
                        Contact: Contact,
                        Updated_At: Updated_At,
                        Deleted_At: Deleted_At
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

module.exports = User;