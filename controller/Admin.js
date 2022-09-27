const bcrypt = require("bcrypt");
const User = require("../models/Admin");
const jwt = require("jsonwebtoken");


module.exports.Signup = async (req, res) => {
  try {
    const { userName, password, Email } = req.body;

    if (!(userName && password && Email)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ userName });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await User.create({
      userName,
      time: Date.now(),
      password: encryptedPassword,
      Email,
    });
    const token = jwt.sign({ user }, process.env.TOKEN_KEY);
    // const token = generateJwtToken(user)

    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
  }
};

//login

module.exports.Login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ userName });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      // const token = generateJwtToken(user);
      const token = jwt.sign({ user }, process.env.TOKEN_KEY);
      // user.token = token;
      // user
      res.status(200).json({user,token});
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};
