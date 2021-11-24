const express = require("express");
const router = express.Router();
const axios = require("axios");
const ApiWine = require("../models/ApiWine.model");

router.get("/collection", (req, res, next) => {
  ApiWine.find()
    .then((wines) => {
      res.render("wines/collection.hbs", { wines });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/collection/white", (req, res, next) => {
  ApiWine.find({ wineType: "white" })
    .then((wines) => {
      res.render("wines/collection.hbs", { wines });
    })
    .catch((err) => console.log("Err while editing a wine: ", err));
});

router.post("/collection/red", (req, res, next) => {
  ApiWine.find({ wineType: "red" })
    .then((wines) => {
      res.render("wines/collection.hbs", { wines });
    })
    .catch((err) => console.log("Err while editing a wine: ", err));
});

router.post("/collection", (req, res, next) => {
  ApiWine.find()
    .then((wines) => {
      res.render("wines/collection.hbs", { wines });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/random-wine", (req, res, next) => {
  res.render("wines/random-wine.hbs");
});

router.get("/random-wine/surprise", (req, res, next) => {
  ApiWine.find()
    .then((wines) => {
      res.render("wines/random-wine.hbs", {
        wines: wines[Math.floor(Math.random() * wines.length)],
      });
    })
    .catch((err) => {
      next(err);
    });
});

// router.post("/random-wine", (req, res, next) => {
//   ApiWine.statics.random = async function () {
//     const count = await this.count();
//     const rand = Math.floor(Math.random() * count);
//     const randomDoc = await this.findOne().skip(rand);
//     return randomDoc;
//   };
// });


router.get("/quizresult/:name", (req, res, next) => {
    
    ApiWine.findOne({title: {"$regex": req.params.name, $options: 'i'} })
      .then((wine) => {
      console.log(wine)
      console.log("working")
      res.render("quizResult/result.hbs", { wine });
    })
    
      .catch((err) => {
        res.render("quizResult/result.hbs");
      });
    
  }); 






module.exports = router;

// ApiWine.count().exec(function (err, count) {
//   let random = Math.floor(Math.random() * count);
//   ApiWine.findOne()
//     .skip(random)
//     .exec(function (err, result) {})
//     .then((wines) => {
//       res.render("/wines/random-wine.hbs", { wines });
//};
//     });
