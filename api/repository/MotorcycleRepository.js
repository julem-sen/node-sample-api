const pool = require("./../../config/database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generate = require('../../helpers/generate-key.js');
require("dotenv").config();

const Motorcycle = require("../models/Motorcycle");

class MotorcycleRepository {
    MotorcycleDetails(id, callback) {
        const sql = 'SELECT * ' + 
                    'FROM tbl_motorcycles WHERE motorcycle_id = ? ' + 
                    'WHERE deleted_at IS NULL';
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

    RegisterMotorcycle(motorcycle, callback) {
        new Motorcycle(
            null,
            generate.generateId(),
            motorcycle.motorcycle_name,
            motorcycle.motorcycle_description,
            motorcycle.motorcycle_brand,
            motorcycle.motorcycle_year,
            motorcycle.ownedby,
            motorcycle.rentedby,
            motorcycle.fueltype,
            motorcycle.motorcycle_type,
            motorcycle.motorcycle_transmission,
            motorcycle.motorcycle_version,
            motorcycle.kmlimit,
            motorcycle.servicestatus,
            motorcycle.location,
            motorcycle.price,
            motorcycle.priceperwhat,
            null,
            null,
            null

        ).then((newPost) => {
            const sql = "INSERT INTO tbl_motorcycles SET ?";
            pool.query(sql, newPost, (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        });
    }

    UpdateMotorcycleDetails(id, motorcycle, callback) {
        const updateMotorcycle = new Motorcycle(
            null,
            generate.generateId(),
            motorcycle.motorcycle_name,
            motorcycle.motorcycle_description,
            motorcycle.motorcycle_brand,
            motorcycle.motorcycle_year,
            motorcycle.ownedby,
            motorcycle.rentedby,
            motorcycle.fueltype,
            motorcycle.motorcycle_type,
            motorcycle.motorcycle_transmission,
            motorcycle.motorcycle_version,
            motorcycle.kmlimit,
            motorcycle.servicestatus,
            motorcycle.location,
            motorcycle.price,
            motorcycle.priceperwhat,
            null,
            new Date(),
            null);
        const sql = 'UPDATE tbl_motorcycles SET ? WHERE Id = ?';
        pool.query(sql, [updateMotorcycle, id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    RemoveMotorcycle(id, callback) {
        const sql = 'UPDATE tbl_motorcycles SET deleted_at = ? WHERE id = ?';
        pool.query(sql, [new Date(), id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = new MotorcycleRepository();
