const mongoose = require("mongoose");
const AnswerSchema = new mongoose.Schema(
  {

    Answer: {
      type: String,
      default: null,
    },
    UserID: {
      type: String,
      default: null,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Answer", AnswerSchema);
