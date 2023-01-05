import axios from "axios"
import * as cheerio from 'cheerio';
import {category} from "./category.js"
var specificRecipes= [];

export function recipesByCategory (categoryName){
    
    const categoryLink= category.filter(category => category.name==categoryName)[0].links[0];
    const categoryBase= category.filter(category => category.name==categoryName)[0].base;
    
     axios.get(categoryLink).
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