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
       $('figure.recipe > a div.title', html).each(  function(){
        const title= $(this).text().trim();
        const url = $(this.parentNode.parentNode).attr('href');
       
          specificRecipes.push(
          {
            title: title,
            url: categoryBase +url,
            categoryName: categoryName
          }
        )
      })
    }).catch(err=>  console.log(err));
  
  
     return specificRecipes;

}