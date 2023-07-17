const express = require("express");
const serverless = require("serverless-http");
const allRecipes = require("./allRecipes.js");
const recipeById = require("./recipeById.js");
const recipesByCategory = require("./recipesByCategory.js");
const recipes=require("./recipes.js")

const app = express();
const router = express.Router();

app.use("/", router);
app.use("/.netlify/functions/api", router);

router.get("/", (req, res) => {
  res.json("Hello, welcome to my food api :)!");
});

// router.get("/recipes", async (req, res) => {
//   //const allRecipe=await allRecipes.allRecipes()
//   // console.log(allRecipe)
//   const allrecipe=await recipes.arecipes();

//   res.json(allrecipe);
// });
router.get("/recipes", async (req, res) => {
  const allRecipe=await allRecipes.allRecipes()
   console.log(allRecipe)
  console.log(allRecipe)

  res.json(allRecipe[0]);
});

router.get("/recipe/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;

  const recipeList = await allRecipes.allRecipes();
  const displayRecipe = await recipeById.recipeById(recipeId, recipeList[0]);
  res.json(displayRecipe);
});

router.get("/recipes/:categoryName", async (req, res) => {
  const categoryName = req.params.categoryName;
  const listByCategory = await recipesByCategory.recipesByCategory(
    categoryName
  );
  res.json(listByCategory);
});

router.all("*", (req, res) => {
  res
    .status(404)
    .send(
      "404! Ohh you are lost, read the API documentation to find your way back home"
    );
});

module.exports.handler = serverless(app);


// [[redirects]]
// to="/.netlify/functions/api/:splat"
// from="/*"
// status=200
