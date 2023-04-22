const axios = require("axios") ;
const cheerio= require('cheerio');
const category = require("./category.js");
var specificRecipes= [];

 async function recipesByCategory (categoryName){
    
    const categoryLink= category.category.filter(category => category.name===categoryName)[0].links[0];
    const categoryBase= category.category.filter(category => category.name===categoryName)[0].base;
    
    await axios.get(categoryLink).
    then( response => {
      const html = response.data;
      const  $ = cheerio.load(html);

      specificRecipes= []
      $('div.entry figure > a ', html).each(function(){
        const title = $(this).attr('title').trim();
        const url = $(this).attr('href');
       // const id = (!recipes.length ? 1 : (recipes.length)+1)
       const img=$(this).children().first().children().first().attr('data-src');
        const id=url.slice(-5);
       
          specificRecipes.push(
          {
            title: title,
            url: categoryBase +url,
            categoryName: categoryName,
            id : id,
            img: img
          }
        )
      })
    }).catch(err=>  console.log(err));
  
  
     return specificRecipes;

}
exports.recipesByCategory=recipesByCategory;