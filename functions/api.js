//const PORT = process.env.PORT || 1000;

const express = require("express");
const serverless= require("serverless-http");
const allRecipes  = require("./allRecipes.js");
const recipeById = require("./recipeById.js");
const recipesByCategory = require("./recipesByCategory.js");



const app = express();
const router = express.Router();
const recipe = allRecipes.allRecipes();

//app.use(bodyParser.json())
//app.use("/.netlify/functions/api", router) // path must route to lambda
app.use("/", router)


router.get("/", (req, res) => {
  res.json("Hello, welcome to my food api :)!");
});

router.get("/recipes", (req, res) => {
  res.json(recipe);
});



router.get("/recipe/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  const displayRecipe = recipeById.recipeById(recipeId);
  res.json(displayRecipe);
});

router.get("/recipes/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName;
  const listByCategory = recipesByCategory.recipesByCategory(categoryName);
  res.json(listByCategory);
});



//app.listen(1000, () => console.log('Your app listening on port 1000!'))


//app.listen(PORT, () => console.log(`Server is runninng on PORT ${PORT}`));

module.exports.handler=serverless(app);

