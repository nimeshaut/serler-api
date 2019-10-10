const express = require("express");
const router = express.Router();

const { Article } = require("../models/article");

router.post("/", async (req, res) => {
  //   console.log(req.body);
  //   console.log(req.body.queries[0].search);
  //   console.log(req.body.queries[0].search.field);
  const query = buildQuery(req.body.queries);
//   console.log("displaying query now");
   console.log("sending from query");
  const articles = await Article
    .find()
    .or(query);
    //.or([{name:/first article/i},{tags:/three/i, authors:/nimesh trivedi/i}])
    //.or([{ authors: "Nimesh Trivedi" }]);
  //console.log(articles);
  res.send(articles);
});

function buildQuery(queries) {
  //console.log(queries);
  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte (greater than Equal to)
  //lt (less than)
  //lte (less than equal to)
  //in
  //nin (not in)
  console.log(queries);
  let queryBuilder = {};
  let andOperator ={};
  let orOperator = [];
  queryBuilder.query = [];
  queries.forEach(query => {
    search = query.search;
    let jsonObj = {};
    
    if(query.combineUsing === 'or'){
        orOperator.push(andOperator);
        andOperator = {}
    }

    let searchExp =  new RegExp(`${search.operand}`, 'i');

    if (search.operation === "beginsWith") searchExp =  new RegExp(`^${search.operand}`, 'i');
    if (search.operation === "endsWith") searchExp = new RegExp(`${search.operand}$`, 'i');//`/search.operand$/i`;
    if (search.operation === "contains") searchExp = new RegExp(`.*${search.operand}.*`, 'i');// `/.*search.operand.*/i`;
    if (search.field === "Article title") {
      andOperator["name"] = searchExp;
    }
    if (search.field === "Author") {
        andOperator["authors"] = searchExp;
    }
    if (search.field === "Tag") {
        andOperator["tags"] = searchExp;
    }
    
    //queryBuilder.query.push(jsonObj);
    
    // console.log(jsonObj);
    //console.log(query);
  });
  orOperator.push(andOperator);
  return orOperator;
}
// buildQuery = (queries) => {
//     console.log(queries);
//     return "nimesh";
// }
module.exports = router;
