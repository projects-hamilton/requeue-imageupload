const mongoose = require("mongoose");
const surveySchema = new mongoose.Schema(
  {

   data:[]
  },

  { timestamps: true }
);
// module.exports = mongoose.model("Answer", AnswerSchema);

module.exports = mongoose.model("Answer",surveySchema)


