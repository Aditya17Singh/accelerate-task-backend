var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  content: { type: String, required: true },
//   postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  like: { type: Number, default: 0 },
});

module.exports = mongoose.model("Comment", commentSchema);