
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Adminuser = require('../models/adminuser');
const { HandleRes } = require('../services/helper');

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await Adminuser.findOne({ email });

        if (existingUser) {
            return HandleRes(res, 400, 'User already exists')

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Adminuser({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        return HandleRes(res, 500, err.message)
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Adminuser.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ user }, process.env.TOKEN_KEY, {
            expiresIn: "24d",
        });
        res.status(200).json({ message: 'Authentication successful', token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// const mongoose = require('mongoose');

// // Define the schema for the DonationTypes collection
// const donationTypesSchema = new mongoose.Schema({
//     // Define the properties for each document in the collection
//     name: { type: String, required: true },
//     description: { type: String },
//     // ...add more properties as needed
// });

// // Define the model for the DonationTypes collection
// const DonationTypes = mongoose.model('DonationTypes', donationTypesSchema);

// // Connect to your MongoDB database
// mongoose.connect('mongodb://localhost/my-database');

// // Define the CRUD operation function using the Mongoose model
// const CrudDonationTypes = async (method, body = {}, id = '') => {
//     try {
//         if (method == 'get') {
//             return await Adminuser.find();
//         } else if (method == 'post') {
//             if (body) return await Adminuser.create(body);
//             return false;
//         } else if (method == 'patch') {
//             if (body && id) return await Adminuser.findByIdAndUpdate(id, { $set: body });
//             return false;
//         } else if (method == 'delete') {
//             if (id) return await Adminuser.findByIdAndDelete(id);
//             return false;
//         }
//         return false;
//     } catch (error) {
//         return error.message;
//     }
// };

// // Export the function and the model for use in other parts of your application
// module.exports = {
//     CrudDonationTypes,
//     DonationTypes,
// };

// const Crud = async (modal, method = "get", id = '', body = {}) => {
//     try {
//         if (method == "get") {
//             if (id != "") return await modal.findById(id)
//             return await modal.find()
//         } else if (method == "post") {
//             if (!body) return await modal.create(body)
//             return false
//         } else if (method == "patch") {
//             if (!body && id != "") return await modal.findByIdAndUpdate(id, { $set: body })
//             return false
//         } else if (method == "delete") {
//             if (id != "") return await modal.findByIdAndDelete(id)
//             return false
//         }
//         return false
//     } catch (error) {
//         return error.message
//     }
// }


module.exports = {
    signup,
    login
}