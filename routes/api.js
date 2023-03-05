var express = require('express');
var router = express.Router();
const User = require("../models/User");
const validateToken = require("../auth/validateToken.js"); 

router.get('/', validateToken, (req, res, next) => {
    User.find({}, (err) =>{
      if(err) return next(err);
      return res.json({ email: req.user.email });
    })

    if (req.user.email == null) {
        return res.status(401);
    }
  });

  module.exports = router;