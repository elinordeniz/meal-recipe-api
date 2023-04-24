const category = require("./category.js");
const axios = require("axios");
const cheerio = require("cheerio");
const recipes = [];
const idArray = [];

async function allRecipes() {
   category.category.forEach(async (recipe) => {
    await axios
      .get(recipe.links[0])
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $("div.entry figure > a ", html).each(function () {
          const title = $(this).attr("title").trim();
          const url = $(this).attr("href");
          // const id = (!recipes.length ? 1 : (recipes.length)+1)
          const img = $(this)
            .children()
            .first()
            .children()
            .first()
            .attr("data-src");
          //const img2=img;
          const id = url.slice(-5);

          !idArray.includes(id)
            ? recipes.push({
                title: title,
                url: recipe.base + url,
                category: recipe.name,
                id: id,
                img: img,
              })
            : id;
          idArray.push(id);
        });
      })
      .catch((err) => console.log(err));
  });

  return recipes;
}

exports.allRecipes = allRecipes;
