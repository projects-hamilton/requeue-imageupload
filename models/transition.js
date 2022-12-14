const mongoose = require("mongoose");
require("../models/user");

// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transitionschema = new Schema(
  {
    amount_Value: {
      type: String,
    },

    driver_id: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    status: {
      type: String,
      default: "pending",
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transition", Transitionschema);



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//   name: String,
//   email: String,
//   blogs: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Blog"
//   }]
// });

// const BlogSchema = new Schema({
//   title: String,
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   body: String,
//   comments: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Comment"
//   }]
// })

// const CommentSchema = new Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   blog: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Blog"
//   },
//   body: String
// })

// const User = mongoose.model("Author", UserSchema);
// const Blog = mongoose.model("Blog", BlogSchema);
// const Comment = mongoose.model("Comment", CommentSchema);

// module.exports = { User, Blog, Comment }
