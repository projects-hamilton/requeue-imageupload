
const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema(
  {
    Question: {
      type: String,
      default: null,
    },
    dataType: {
      type: String,
      default: null,
    },
    UserID: {
      type: String,
      default: null,
    },
    extraValue: [
      {
        type: String,
      },
    ],
  },

  { timestamps: true }
);
module.exports = mongoose. model("Question", QuestionSchema);

