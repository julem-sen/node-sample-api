const motorcycleRepository = require('../repository/MotorcycleRepository');

exports.MotorcycleDetails = (req, res) => {
    const id = req.query.id;
    motorcycleRepository.MotorcycleDetails(id, (err, result) => {

    });
}

exports.RegisterMotorcycle = (req, res) => {
    motorcycleRepository.RegisterMotorcycle(req.body, (err, result) => {

    });
}

exports.UpdateMotorcycleDetails = (req, res) => {
    motorcycleRepository.UpdateMotorcycleDetails(req.body, (err, result) => {

    });
}

exports.RemoveMotorcycle = (req, res) => {
    motorcycleRepository.RemoveMotorcycle(req.params.id, (err, result) => {

    });
}