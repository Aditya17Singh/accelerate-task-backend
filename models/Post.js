var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: {type: String},
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    like: { type: Number, default: 0 },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Post", PostSchema);
