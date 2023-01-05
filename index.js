const PORT = process.env.PORT || 8000;
import express from "express";
import { allRecipes } from "./allRecipes.js";
import { recipeById} from "./recipeById.js";
import { recipesByCategory } from "./recipesByCategory.js";



const app = express();
const recipe = allRecipes();



app.get("/", (req, res) => {
  res.json("Hello, welcome to my food api!");
});

app.get("/recipes", (req, res) => {
  res.json(recipe);
});



app.get("/recipe/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  const displayRecipe = recipeById(recipeId);
  res.json(displayRecipe);
});

app.get("/recipes/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName;
  const listByCategory = recipesByCategory(categoryName);
  res.json(listByCategory);
});


app.listen(PORT, () => console.log(`Server is runninng on PORT ${PORT}`));
