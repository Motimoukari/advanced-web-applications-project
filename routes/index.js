var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js") 


const MongoClient = require('mongodb').MongoClient;

async function getAllDocuments() {                                          //using an async function to get all snippets from the database so that the page is not rendered until the snippets are found
  const client = await MongoClient.connect('mongodb://127.0.0.1/user');
  const collection = client.db('user').collection('posts');
  const documents = [];

  try {
    await collection.find({}).forEach(doc => {
      documents.push(doc);
    });
    return documents;
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

/*
function getSnippets(title, codeSnip) {
  const items = ['comment 1', 'comment 2', 'comment 3'];

router.get('/snip/', function(req, res, next) {
  res.render('comments', { title: 'title of snippet', codeSnip: 'const example_code = snippet;', items});

});
}

router.get('/', async (req, res) => {
  const documents = await getAllDocuments();
  res.render('index', { title: 'snippets list', documents, getSnippets: getSnippets });
});
*/

function getSnippets(title, codeSnip) {
  const items = ['comment 1', 'comment 2', 'comment 3'];
  return { title, codeSnip, items };
}

router.get('/snip/', function(req, res, next) {
  const { title, codeSnip } = req.query;
  const snippetData = getSnippets(title, codeSnip);
  res.render('comments', snippetData);
});

router.get('/sniptest/', function(req, res, next) {
  const items = ['comment 1', 'comment 2', 'comment 3'];
  let title = "test_title";
  let codeSnip = "hello world code";
  res.render('comments', {items, title, codeSnip});
});

router.get('/', async (req, res) => {
  const documents = await getAllDocuments();
  res.render('index', { title: 'snippets list', documents, getSnippets: getSnippets });
});


router.post('/post_snippet', (req, res, next) => {
  Post.create(
    {
      codeSnippet: req.body.code,
      title: req.body.title,
      poster: "this email"
    },
    (err, ok) => {
      if(err) throw err;
      return res.redirect("/");
    }
  );
});

router.post('/post_comment', (req, res, next) => {
  Post.findOne({})
  
});



module.exports = router;
