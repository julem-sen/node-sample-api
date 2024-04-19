const pool = require('./../../config/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Customer = require('../models/Customer');

class CustomerRepository {
    CustomerAuth(user, callback) {
        const findCustomer = 'SELECT customer_id, customer_name, customer_email, ' +
                             'customer_password, customer_phone ' +
                             'FROM tbl_customers where customer_email = ? ' +
                             'AND deleted_at IS NULL LIMIT 1';
        pool.query(findCustomer, [user.email], (err, result) => {
            if (err) {
                callback(err, null);
            } else if (result.length == 0) {
                callback({
                    message: 'Email does not exists',
                    status: 404
                }, null);
            } else {
                bcrypt.compare(user.password, result[0].customer_password, (err, compareResult) => {
                    if(err) {
                        callback(err, null);
                    }

                    if(compareResult) {
                        const token = jwt.sign({
                            userId: result[0].customer_id,
                            name: result[0].customer_name,
                            email: result[0].customer_email,
                            contact: result[0].customer_phone,
                        }, process.env.JWT_KEY, {
                            expiresIn: "1h",
                        });
                        callback(null, token)
                    } else {
                        callback({
                            message: 'Incorrect password',
                            status: 401
                        }, null);
                    }
                });
            }
        });
    }

    GetCustomers(callback) {
        pool.query('SELECT * FROM tbl_customers', (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    CustomerDetails(id, callback) {
        const sql = 'SELECT id, customer_name, ' +
                    'customer_email, customer_phone, updated_at, deleted_at ' + 
                    'FROM tbl_customers WHERE customer_id = ?';
        pool.query(sql, id, (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                if (rows.length) {
                    callback(null, rows);
                } else {
                    callback(null, null);
                }
            }
        });
    }

    RegisterCustomer(user, callback) {
        new Customer(null, user.name, user.email, user.password, user.contact, null, null)
            .then(newUser => {
                const insertQuery = 'SELECT customer_email FROM tbl_customers where customer_email = ?'
                pool.query(insertQuery, [user.email], (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else if (result && result.length >= 1) {
                        callback(new Error('User already exists'), null);
                    }
                    else {
                        const sql = 'INSERT INTO tbl_customers SET ?';
                        pool.query(sql, newUser, (err, result) => {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, result);
                            }
                        });
                    }
                })
            })
            .catch(err => {
                callback(err, null);
            });
    }

    UpdateCustomerInformation(id, user, callback) {
        const updatedUser = new Customer(null, user.Name, user.Email, user.Contact, null, new Date(), null);
        const sql = 'UPDATE tbl_customers SET ? WHERE Id = ?';
        pool.query(sql, [updatedUser, id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    DeleteCustomerAccount(id, callback) {
        const sql = 'UPDATE tbl_customers SET deleted_at = ? WHERE id = ?';
        pool.query(sql, [new Date(), id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = new CustomerRepository();