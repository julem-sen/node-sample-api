const pool = require('./../../config/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');


class UserRepository {
    UserLogin(user, callback) {
        const findQuery = 'SELECT id, name, email, password, contact FROM tbl_users where email = ? AND deleted_at IS NULL LIMIT 1'
        pool.query(findQuery, [user.email], (err, result) => {
            if(err) {
                callback(err, null);
            } else if(result.length == 0) {
                callback({
                    message: 'Email does not exists',
                    status: 404
                }, null);
            } else {
                bcrypt.compare(user.password, result[0].password, (err, compareResult) => {
                    if(err) {
                        callback(err, null)
                    }
                    if(compareResult) {
                      const token = jwt.sign({
                            userId: result[0].id,
                            name: result[0].name,
                            email: result[0].email,
                            contact: result[0].contact,
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

    GetUsers(callback) {
        pool.query('SELECT * FROM tbl_users', (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    CreateUser(user, callback) {
        new User(null, user.name, user.email, user.password, user.contact, null, null)
            .then(newUser => {
                const insertQuery = 'SELECT email FROM tbl_users where email = ?'
                pool.query(insertQuery, [user.email], (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else if (result && result.length >= 1) {
                        callback(new Error('User already exists'), null);
                    }
                    else {
                        const sql = 'INSERT INTO tbl_users SET ?';
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

    UserDetails(id, callback) {
        const sql = 'SELECT id, name, email, contact, updated_at, deleted_at FROM tbl_users WHERE id = ?';
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

    UpdateUser(id, user, callback) {
        const updatedUser = new User(null, user.Name, user.Email, user.Contact, null, new Date(), null);
        const sql = 'UPDATE tbl_users SET ? WHERE Id = ?';
        pool.query(sql, [updatedUser, id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    DeleteUser(id, callback) {
        const sql = 'UPDATE tbl_users SET deleted_at = ? WHERE id = ?';
        pool.query(sql, [new Date(), id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

}

module.exports = new UserRepository();