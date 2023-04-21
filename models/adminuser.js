const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const adminuserSchema = new mongoose.Schema({
  password: {
    type: String
  },
  email: {
    type: String
  }
}, { timestamps: true });


const Adminuser = mongoose.model("Adminuser", adminuserSchema);
module.exports = Adminuser


module.exports.createAdmin = async (email = "admin@gmail.com", password = "admin@123") => {
  const user = await Adminuser.findOne({ email })
  const hash = await bcrypt.hash(password, 10)
  if (!user) await Adminuser.create({ email, password: hash })
}
module.exports.getAdmin = async (id) => {
  if (id) return await Adminuser.findById(id)
  return await Adminuser.find()
}

