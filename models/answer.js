const mongoose = require("mongoose");
const surveySchema = new mongoose.Schema(
  {
     UserID: {
      type: String,
      default: null,
    },
     Answer: {
      type: String,
      default: null,
    },
     Question_ID: {
      type: String,
      default: null,
    },
    
  },

  { timestamps: true }
);
// module.exports = mongoose.model("Answer", AnswerSchema);

module.exports = mongoose.model("Answer",surveySchema)


