
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
        return HandleRes(res)
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

module.exports = {
    signup,
    login
}