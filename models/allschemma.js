// const mongoose = require('mongoose');


// const AreaGroupSchema = new mongoose.Schema({

//     location: {
//         type: String,
//     },

//     user_id: {
//         type: String,
//     },


// }, { timestamps: true });


// const InvoiceDetailsschema = mongoose.Schema({

//     firstname: {
//         type: String,
//     },

//     lastname: {
//         type: String,

//     },

//     driver_id: {
//         type: String,
//     },

//     email: {
//         type: String,
//     },

//     mobile: {
//         type: String
//     },

//     today_total_delevery: {
//         type: String
//     },

//     total_amount: {
//         type: String,
//     },


//     date: {
//         type: String
//     }


// }, { timestamps: true });

// const userSchema = new mongoose.Schema({

//     firstname: {
//         type: String
//     },

//     lastname: { type: String },

//     role: { type: String },

//     password: { type: String },

//     email: { type: String },

//     mobile: {
//         type: String,
//         // allowNull: false
//     },

//     is_mobile_verified: {
//         type: Boolean,
//         default: false
//     },

//     profile_image: {
//         type: String
//     },
//     dob: {
//         type: String
//     },

//     role: {
//         type: String,
//         comment: "Supervisor, Maintainers, ADMIN, DRIVER,Company"
//     },

//     country: {
//         type: String,
//         comment: "Kuwait = KW, UAE= AE, SAUDI ARAB = SA, Oman = OM, QATAR = QA, Baharain = BH"
//     },
//     confirmPassword: {
//         type: String
//     },
//     otp: { type: String, required: true },

// }, { timestamps: true });

// const WalletDetailsschema = mongoose.Schema({
//     amount_Value: {
//         type: String,
//     },

//     amount_type: {
//         type: String,
//     },

//     driver_id: {
//         type: String,
//     },

//     currency: {
//         type: String,
//         comment: "KWD,INR",
//     },
//     amount_Paid: {
//         type: String
//     },


// }, { timestamps: true });

// const DriverBusinessDetailsSchema = new mongoose.Schema(
//     {
//         id: {
//             type: Number,
//             autoIncrement: true,
//         },

//         otp: { type: String, required: true },
//         driver_id: {
//             type: String,
//         },

//         motor_type: {
//             type: String,
//             comment: "BIKE, SMALL_CAB, BIG_CAB, MINI_TRUCK, BIG_TRUCK",
//         },

//         address: {
//             type: String,
//         },

//         status: {
//             type: String
//         },

//         is_approved: {
//             type: Boolean,
//             defaultValue: false
//         },

//         location: { type: String }
//     },

//     {
//         modelName: "DriverBusinessDetails",
//         timestamps: true,
//         freezeTableName: true,
//     },

// );

// const DeliveryDetailsschema = mongoose.Schema({
//     amount_Value: {
//         type: String,
//     },

//     pay_type: {
//         type: String,

//     },

//     driver_id: {
//         type: String,
//     },

//     delivery_address: {
//         type: String,
//     },

//     distance: {
//         type: String
//     },
//     date: {
//         type: String
//     },

//     status: {
//         type: String,
//         default: "pending"
//     },

//     photo: {
//         type: String
//     },

//     itmes: {
//         type: Array,
//         default: [],
//     },

//     picked_location: {
//         type: String
//     },


// }, { timestamps: true });

// const Notificationschema = mongoose.Schema({

//     status: {
//         type: String,
//         default: null
//     },

//     date: {
//         type: String
//     },

//     userid: {
//         type: String
//     },

//     msg: {
//         type: String

//     },

//     link: {
//         type: String
//     }


// }, { timestamps: true });


// const Transitionschema = mongoose.Schema({
//     amount_Value: {
//         type: String,
//     },

//     driver_id: {
//         // type: String,
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "users"
//     },

//     status: {
//         type: String,
//         default: "pending"
//     },
//     date: {
//         type: String
//     },


// }, { timestamps: true });

// module.exports = mongoose.model("Transition", Transitionschema);

// module.exports = mongoose.model("Notification", Notificationschema);
// module.exports = mongoose.model("Delivery", DeliveryDetailsschema);

// module.exports = mongoose.model("DriverDetails", DriverBusinessDetailsSchema);

// module.exports = mongoose.model("Wallet", WalletDetailsschema);

// module.exports = mongoose.model("user", userSchema)

// module.exports = mongoose.model("Invoice", InvoiceDetailsschema);

// module.exports = mongoose.model("Area", AreaGroupSchema);


