var express = require("express");
var User = require("../models/User");
var Post = require("../models/Post");
var User = require("../models/User");
var auth = require("../middlewares/auth");
var Comment = require("../models/Comment");
var router = express.Router();

// get all post
router.get("/", async (req, res, next) => {
  try {
    let post = await Post.find();
    return res.send({ post });
  } catch (error) {
    console.log(error, "get Request");
    next(error);
  }
});

// create post
router.post("/", auth.verifyToken, async (req, res, next) => {
  req.body.post.author = req.user.userId;
  try {
    req.body.id = req.body.title;
    var post = await Post.create(req.body.post);
    res.json({ post });
  } catch (error) {
    console.log(error, "post  error");
    next(error);
  }
});

//likes
router.get("/:id/like", async (req, res, next) => {
  var id = req.params.id;
  try {
    var post = await Post.findByIdAndUpdate(id, { $inc: { like: 1 } });
    res.json({ post });
  } catch (error) {
    console.log(error, "post  error");
    next(error);
  }
});

//Add comment
// router.post("/:id/comments", (req, res, next) => {
//   var id = req.params.id;
//   req.body.postId = id;
//   let comment = Comment.create(req.body, (err, comment) => {
//     if (err) return next(err);
//     console.log(comment);
//     //update event with comment id into comment sections
//     Post.findByIdAndUpdate(
//       id,
//       { $push: { comments: comment.id } },
//       (err, updatedevent) => {
//         if (err) return next(err);
//       }
//     );
//   });
//   res.json({ comment });
// });

module.exports = router;
