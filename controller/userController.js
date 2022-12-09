// const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const DriverDetails = require("../models/driver-business-detail");
const { bcrypt, compare } = require("../services/crypto");
const { encrypt } = require("../services/crypto");
const { sendMail } = require("../services/MAIL");

const JWTkey = process.env.TOKEN_KEY;
// const dotenv = require(')
require("dotenv");

const generateJwtToken = (user) => {
  return jwt.sign({ user }, JWTkey, {
    expiresIn: "7d",
  });
};

const Storedata = (search, data) => {
  for (let i = 0; i < search.length; i++) {
    if (
      data[search[i]] == "" ||
      data[search[i]] == undefined ||
      data[search[i]] == null
    ) {
      return [false, search[i]];
    }
  }
  return [true, ""];
};

function storedetails(status, message, res, data) {
  res.status(status).json({ message, data });
}

//Signup
const Signup = async (req, res) => {
  try {
    let search = Storedata(
      [
        "firstname",
        "password",
        "lastname",
        "email",
        "mobile",
        "country",
        "confirmPassword",
        "role"
      ],
      req.body
    );
    if (search[0] == false)
      return res
        .status(400)
        .json({ message: `${search[1]} Field Required`, data: [] });

    const {
      firstname,
      password,
      email,
      lastname,
      country,
      mobile,
      confirmPassword,
      role
    } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser)
      return storedetails(400, "User Already Exist. Please Login", res, []);

    if (password !== confirmPassword)
      return res.status(400).json({
        message: "Passowrd does not match",
      });

    if (
      ["Supervisor", "Maintainers", "ADMIN", "DRIVER", "Company"].indexOf(
        req.body.role
      ) === -1
    ) {
      return res
        .status(400)
        .json({ message: "role must be either DRIVER or STORE or ADMIN" });
    }
    if (req.body.role == "DRIVER") {
      let search = Storedata(["motor_type", "address", "id"], req.body);
      if (search[0] == false)
        return res
          .status(400)
          .json({ message: `${search[1]} Field Required`, data: [] });

      if (
        ["BIKE", "SMALL_CAB", "BIG_CAB", "MINI_TRUCK", "BIG_TRUCK"].indexOf(
          req.body.motor_type
        ) == -1
      ) {
        return res.status(400).json({
          message:
            "motorType must be either BIKE or SMALL_CAB or BIG_CAB or MINI_TRUCK or BIG_TRUCK",
        });
      }
    }

    // let encryptedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = await encrypt(password);
    const otpGenerated = Math.floor(100000 + Math.random() * 9000);
    console.log(otpGenerated, "jjjjjj");

    const user = await User.create({
      firstname,
      password: hashedPassword,
      email,
      lastname,
      country,
      mobile,
      otp: otpGenerated,
      role
    });
    // if(!user)return res.status(400).json({
    //   message: 'Unable to create new user',
    // });

    let mail = await sendMail({
      to: email,
      OTP: otpGenerated,
    });

    if (req.body.role == "DRIVER") {
      const { motor_type, address, id } = req.body;
      const GetDrivesDetails = await DriverDetails.create({
        driver_id: user._id,
        motor_type,
        address,
        id,
        otp: otpGenerated,
      });

      const token = jwt.sign({ user }, process.env.TOKEN_KEY);
      res.status(201).json({ user, GetDrivesDetails, token });
    }

    const token = jwt.sign({ user }, process.env.TOKEN_KEY);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//login
const Login = async (req, res) => {
  try {
    let search = Storedata(["email", "password"], req.body);
    if (search[0] == false) {
      res
        .status(400)
        .json({ message: `${search[1]} Field Required`, data: [] });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "No User existing" });
    if (user && (await compare(password, user.password))) {
      // Create token
      // const token = generateJwtToken(user);
      const token = jwt.sign({ user }, process.env.TOKEN_KEY, {
        expiresIn: "24h",
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


//Varify Otp
const verify_OTP = async (req, res) => {
  try {
    // const { email, otp } = req.body;
    let search = Storedata(["otp", "email"], req.body);
    if (search[0] == false)
      return res
        .status(400)
        .json({ message: `${search[1]} Field Requried`, data: [] });

    const { email, otp ,role} = req.body;

    let Existing = await User.findOne({email});
    console.log(Existing,"ghggggg")

    if (!Existing) return res.status(400).json({ message: "User not found" });
    const updatedUser = await User.findByIdAndUpdate(Existing._id, {
      $set: { active: true },
    });

    let token = generateJwtToken(Existing);

    res.status(200).json({message:"Varify OTP",user: updatedUser, token });

    if (Existing && Existing.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if ("DRIVER" == Existing.role) {
      let driverDetails = await DriverDetails.find({
        driver_id: Existing._id,
      });

      return res.status(200).json({ driverDetails, user: updatedUser, token });
    }

    // return res.status(200).json({ user: updatedUser, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


// const verify_OTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     let Existing = await User.findOne({ email })

//     if (!Existing) return res.status(400).json({ message: 'User not found' });

//     if (Existing && Existing.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

//     const updatedUser = await User.findByIdAndUpdate(Existing._id, { $set: { active: true } });

//     let token = generateJwtToken(Existing)

//     res.status(200).json({ user: updatedUser, token });

//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }

// };



//Reset Password
const RestPasswordsendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user already exist
    let Existing = await User.findOne({ Email: email });

    if (!Existing) return res.status(400).json({ message: "User not found" });

    const otpGenerated = Math.floor(100000 + Math.random() * 900000);

    const updatedUser = await User.findByIdAndUpdate(Existing._id, {
      $set: { otp: otpGenerated },
    });

    if (!updatedUser)
      return res.status(400).json({ message: "Unable to Generate otp" });

    let mail = await sendMail({
      to: email,
      OTP: otpGenerated,
    });

    return res.status(200).json({ message: "Mail Send" });
  } catch (error) {
    return res.send("Unable to Send OTP, Please try again later", error);
  }
};


//.RestPasswordOtp
const CheckOtpSendSMS = async (req, res) => {
  try {
    const { otp, email } = req.body;

    let Existing = await User.findOne({ email });
    if (!Existing) return res.status(400).json({ message: "User not found" });

    if (Existing.otp == otp) {
      return res.status(200).json({ message: "Correct OTP" });
    } else {
      return res.status(400).json({ message: "No User existing" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//RestPasswordLink ---
const RestPassword = async (req, res) => {
  try {
    const { password, email } = req.body;

    let Existing = await User.findOne({ email });
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
  Signup,
  verify_OTP,
  RestPassword,
  CheckOtpSendSMS,
  RestPasswordsendOTP,
};
