require("../db");
const mongoose = require("mongoose");
let ApiWine = require("../models/ApiWine.model");
const axios = require("axios");
require("dotenv/config");

const wines = [
  "merlot",
  "pinot_noir",
  "shiraz",
  "malbec",
  "bordeaux",
  "gewurztraminer",
  "chardonnay",
  "riesling",
  "sauvignon_blanc",
  "pinot_grigio",
];

let myPromises = [];
for (i = 0; i < wines.length; i++) {
  myPromises.push(
    axios.get(
      `https://api.spoonacular.com/food/wine/recommendation?wine=${wines[i]}&number=10&apiKey=${process.env.SPOONACULAR_KEY}`
    )
  );
}
Promise.all(myPromises)
  .then((responses) => {
    let merge = [];
    responses.forEach((eachResp, i) => {
      console.log(merge.length);
      eachResp.data.recommendedWines.forEach((w) =>
        i < 5 ? (w.type = "red") : (w.type = "white")
      );

      merge = [...merge, ...eachResp.data.recommendedWines];
    });
    return ApiWine.insertMany(merge);
  })
  .then(() => {
    console.log("Data inserted");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Error ", err);
    mongoose.connection.close();
  });
