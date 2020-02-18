const express = require('express');
const router  = express.Router();
const passportRouter = require("./passportRouter");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.use('/', passportRouter);

module.exports = router;
