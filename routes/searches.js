const express = require("express");
const router = express.Router();

const { Article } = require("../models/article");

// router.post("/", async (req, res) => {
//   // if (req.body.conditions) {
//   //     const submitter = await User.findById(req.body.submitterId);
//   //     if (!submitter) return res.status(400).send("Invalid submitter");
//   //   }
//   const articles = await Article.find(req.body.conditions);
//   res.send(articles);
// });

router.post("/", async (req, res) => {
  console.log(req.body.search);
  const articles = await Article.find();
  res.send(articles);
});

module.exports = router;
