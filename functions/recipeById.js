const axios = require("axios");
const cheerio = require("cheerio");

let ingredients = [];
let displayAll = [];
let descriptionSteps = [];

async function recipeById(recipeId, recipeList) {
  const recipeLink = await recipeList?.filter(
    (recipe) => recipe.id === recipeId
  )[0]?.url;
  const recipeCategory = await recipeList?.filter(
    (recipe) => recipe.id === recipeId
  )[0]?.category;
  const className = `dev-ingredient-amount-${recipeId}`;

  await axios
    .get(recipeLink)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      ingredients = [];
      $("ul.list:not(.hide) > li", html).each(function () {
        const amount = $(this).find(`.${className}`).text().trim();
        const ingredientValue = $(this).find(".dev-ingredient-value").text();
        const ingredientKey = $(this).find(".dev-ingredient-key").text();

        ingredients.push({
          amount,
          ingredientValue,
          ingredientKey,
        });
      });
      const title = $("div.title >h1", html).text();
      const img = $(".swiper-slide> img", html).attr("data-src") 
      || $(".video", html).attr("data-image")
      || $(".image > .lazy", html).attr("data-src") ;
      descriptionSteps = [];
      $("div.description > p", html).each(function () {
        const description = $(this).text();
        const step =
          descriptionSteps.length == 0 ? 1 : descriptionSteps.length + 1;
        descriptionSteps.push({
          step,
          description,
        });
      });
      displayAll = [
        {
          id: recipeId,
          title: title,
          category: recipeCategory,
          img: img,
          ingredients,
          descriptionSteps: descriptionSteps,
        },
      ];
    })
    .catch((err) => console.log(err));

  return displayAll;
}

exports.recipeById = recipeById;
