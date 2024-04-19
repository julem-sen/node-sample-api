
const userRepository = require('../repository/UserRepository');


exports.UserLogin = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    userRepository.UserLogin(user, (err, token) => {
        if(err) {
            res.status(err.status || 500).json({
                message: err.message || 'Internal Server Error'
            });
        } else {
            res.status(200).json({
                message: 'Authentication successful!',
                token: token
            });
        }
    });
}

exports.GetUsers = (req, res) => {
    userRepository.GetUsers((err, users) => {
        if(err) {
            res.status(500).json({
                message: `Error: ${err}`
            });
        } else {
            res.status(200).json({
                data: users
            });
        }
    });
}

exports.UserDetails = (req, res) => {
    const id = req.query.id;
    userRepository.UserDetails(id, (err, user) => {
        if(err) {
            res.status(500).json({
                message: `Error: ${err}`
            });
        } else {
            if (user) {
                res.status(200).json({ message: 'User found', data: user });
            } else {
                res.status(404).json({ message: 'User not found' });
            }     
        }
    });
}

exports.CreateUser = (req, res) => {
    userRepository.CreateUser(req.body, (err, result) => {
        if (err) {
            switch (err.message) {
                case 'All fields are required':
                    res.status(400).json({ message: err.message});  // Bad Request
                    break;
                case 'Name must be a string and at least 3 characters long':
                    res.status(422).json({ message: err.message});  // Unprocessable Entity
                    break;
                case 'Email is not valid':
                    res.status(422).json({ message: err.message});  // Unprocessable Entity
                    break;
                case 'Contact must start with 0 or +63':
                    res.status(422).json({ message: err.message});  // Unprocessable Entity
                    break;
                case 'User already exists':
                    res.status(409).json({ message: 'User already exists'});
                    break;
                default:
                    res.status(500).json({ message: 'Internal server error'});
            }
        }   
        else {
            res.status(201).json({ message: 'User created'});
        }
    });
}

exports.UpdateUser = (req, res) => {
    userRepository.UpdateUser(req.body, (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message});
        } else {
            res.status(201).json({ message: 'User updated', data: result});
        }
    });
}

exports.DeleteUser = (req, res) => {
    userRepository.DeleteUser(req.params.id, (err, result) => {
        if(err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: 'User deleted', data: result });
        }
    });
};