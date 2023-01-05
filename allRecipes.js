import {category} from "./category.js"
import axios from "axios"
import * as cheerio from 'cheerio';
const recipes = [];
  
  export function allRecipes() {
    

    category.forEach(recipe => {
    axios.get(recipe.links[0]).
    then(response=> {
      const html= response.data;
      const $=cheerio.load(html);
    
      $('figure > a div.title', html).each(function(){
        const title = $(this).text().trim();
        const url = $(this.parentNode.parentNode).attr('href');
       // const id = (!recipes.length ? 1 : (recipes.length)+1)
       const img=$('figure > a div.image img', html).attr('data-src');
        const id =url.slice(-5);
        recipes.push({
          title,
          url: recipe.base + url,
          category: recipe.name,
          id : id,
          img: img
        })
      })
    })
    
  
  })
  
return recipes;
}
