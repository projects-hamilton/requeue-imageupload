// const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { bcrypt, compare } = require("../services/crypto");
const { encrypt } = require("../services/crypto");
const { sendMail } = require("../services/MAIL");
const { validater } = require("../services/helper");

require("dotenv");




//login
const Login = async (req, res) => {
  try {
    let search = validater(["email", "password"], req.body);
    if (search[0] == false) {
      return res
        .status(400)
        .json({ message: `${search[1]} Field Required`, data: [] });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ company_id: req.company_id, email });

    if (!user) return res.status(400).json({ message: "No User existing" });
    if (user && (await compare(password, user.password))) {
      let user = await User.findOne({ company_id: req.company_id, email }).select(['-password', '-otp']);

      // Create token
      // const token = generateJwtToken(user);
      const token = jwt.sign({ user }, process.env.TOKEN_KEY, {
        expiresIn: "24d",
      });
      // user.token = token;
      // user
      res.status(200).json({ user, token });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};


//Reset Password
const RestPasswordsendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user already exist
    let Existing = await User.findOne({ company_id: req.company_id, email });

    if (!Existing) return res.status(400).json({ message: "User not found" });


    const otpGenerated = Math.floor(100000 + Math.random() * 900000);

    const updatedUser = await User.findByIdAndUpdate(Existing._id, {
      $set: { otp: otpGenerated },
    });

    if (!updatedUser) return res.status(400).json({ message: "Unable to Generate otp" });

    let mail = await sendMail({
      to: email,
      OTP: otpGenerated,
    });

    return res.status(200).json({ message: "Mail Send" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//.RestPasswordOtp
const CheckOtpSendSMS = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const Existing = await User.findOne({ company_id: req.company_id, email });
    if (!Existing) return res.status(400).json({ message: "User not found" });

    if (Existing.otp == otp) {
      return res.status(200).json({ message: "Correct OTP" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//RestPasswordLink ---
const RestPassword = async (req, res) => {
  try {
    const { password, email } = req.body;

    const Existing = await User.findOne({ company_id: req.company_id, email });
    if (!Existing) return res.status(400).json({ message: "User not found" });

    const hashedPassword = await encrypt(password);
    const updatedUser = await User.findByIdAndUpdate(Existing._id, {
      $set: { password: hashedPassword },
    });

    if (!updatedUser) {
      return res.status(200).json({ message: "Password not Updated" });
    } else {
      return res.status(400).json({ message: "Password Updated" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



module.exports = {
  Login,
  RestPassword,
  CheckOtpSendSMS,
  RestPasswordsendOTP,
};



