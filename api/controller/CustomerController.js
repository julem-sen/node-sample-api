const customerRepository = require('../repository/CustomerRepository');

exports.CustomerAuth = (req, res) => {
    const customer = {
        email: req.body.email,
        password: req.body.password
    }
    customerRepository.CustomerAuth(customer, (err, token) => {
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

exports.GetCustomers = (req, res) => {
    customerRepository.GetCustomers((err, customers) => {
        if(err) {
            res.status(500).json({
                message: `Error: ${err}`
            });
        } else {
            res.status(200).json({
                data: customers
            });
        }
    });
}

exports.CustomerDetails = (req, res) => {
    const id = req.query.id;
    customerRepository.CustomerDetails(id, (err, customer) => {
        if(err) {
            res.status(500).json({
                message: `Error: ${err}`
            });
        } else {
            if (customer) {
                res.status(200).json({ message: 'Customer found', data: customer });
            } else {
                res.status(404).json({ message: 'Customer not found' });
            }     
        }
    });
}

exports.RegisterCustomer = (req, res) => {
    customerRepository.RegisterCustomer(req.body, (err, result) => {
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
                case 'Customer already exists':
                    res.status(409).json({ message: 'Customer already exists'});
                    break;
                default:
                    res.status(500).json({ message: 'Internal server error'});
            }
        }   
        else {
            res.status(201).json({ message: 'Customer created'});
        }
    });
}

exports.UpdateCustomerInformation = (req, res) => {
    customerRepository.UpdateCustomerInformation(req.body, (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message});
        } else {
            res.status(201).json({ message: 'Customer updated', data: result});
        }
    });
}

exports.DeleteCustomerAccount = (req, res) => {
    customerRepository.DeleteCustomerAccount(req.params.id, (err, result) => {
        if(err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: 'Customer deleted', data: result });
        }
    });
}