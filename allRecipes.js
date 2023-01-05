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
    
      $('div.entry figure > a ', html).each(function(){
        const title = $(this).attr('title').trim();
        const url = $(this).attr('href');
       // const id = (!recipes.length ? 1 : (recipes.length)+1)
       const img=$(this).children().first().children().first().attr('data-src');
       //const img2=img;
        const id =url.slice(-5);
        recipes.push({
          title: title,
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
