const mongoose = require('mongoose');

const WalletDetailsschema = mongoose.Schema({
    amount_Value: {
        type: String,
      },
      
      amount_type: {
        type: String,
      },

      driver_id: {
        type: String,
      },

    currency: {
        type: String,
        comment: "KWD,INR",
    },
    

},{ timestamps: true });

module.exports = mongoose.model("Wallet", WalletDetailsschema);





// const mongoose = require('mongoose');

// const userWalletSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//         unique: true
//     },
//     balance: {
//         type: Number,
//         default: 0
//     },
//     role: {
//         type: String,
//         default: 'user',
//         enum: ['user']
//     },
//     currency: {
//         type: String,
//         default: 'INR'
//     }
// }, {
//     timestamps: true
// })

// module.exports = mongoose.model('UserWallet', userWalletSchema);
