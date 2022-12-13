const mongoose = require('mongoose');

const SalaryStrucuterSchema = mongoose.Schema({

      driver_id: {
        type: String,
      },

    salary_:{
      type:String
    },

    monthly_target:{
      type:String
    },
  
    fix_slary:{
      type:String
    },

   bonous:{
    type:String
   }


},{ timestamps: true });


module.exports = mongoose.model("Salary", SalaryStrucuterSchema);





