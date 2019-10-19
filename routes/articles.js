const express = require("express");
const router = express.Router();

const { Article, validate } = require("../models/article");
const { User } = require("../models/user");
const { Status } = require("../models/status");
const auth = require("../middleware/authenticator");

router.post('/addmanual', async(req, res)=>{
  const article = new Article(req.body);
  article.save()
  .then(article => {
    res.json('article added');
  })
  .catch(err => {
    console.log(err)
    res.json(err);
    });
});

router.get("/", async (_req, res) => {
  const articles = await Article.find();
  res.send(articles);
});

router.get("/:id", auth, async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article)
    return res.status(404).send("The article with given id was not found");
  res.send(article);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // find submitter and save it
  if (req.body.submitterId) {
    const submitter = await User.findById(req.body.submitterId);
    if (!submitter) return res.status(400).send("Invalid submitter");
  }

  // find status and save it
  const status = await Status.findOne({ name: "Submitted" });
  if (!status) return res.status(400).send("Invalid status");

  const article = new Article({
    name: req.body.name,
    tags: req.body.tags,
    authors: req.body.authors,
    status: {
      _id: status._id,
      name: status.name
    }
  });

  if (req.body.submitterId) {
    article.submitter = {
      _id: submitter._id,
      name: submitter.name
    };
  }

  await article.save();
  res.send(article);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let article = {
    name: req.body.name,
    submitterId: req.body.submitterId,
    tags: req.body.tags
  };

  try {
    article = await Article.findByIdAndUpdate(req.params.id, article, {
      new: true
    });
    if (!article)
      return res.status(404).send("The article with given id was not found");
    res.send(article);
  } catch (err) {}
});

router.delete("/:id", auth, async (req, res) => {
  const article = await Article.findByIdAndRemove(req.params.id);
  if (!article)
    return res.status(404).send("The article with given id was not found");

  res.send(article);
});

module.exports = router;
