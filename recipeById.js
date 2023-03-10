import { allRecipes } from "./allRecipes.js";
import axios from "axios"
import * as cheerio from 'cheerio';

const recipeList= allRecipes();

 let ingredients=[];
 let displayAll=[];
 let descriptionSteps=[];

export function recipeById (recipeId) {
    console.log(recipeList)
   const recipeLink = recipeList.filter(recipe => parseInt(recipe.id)==recipeId)[0].url;
   const recipeCategory= recipeList.filter(recipe=> recipe.id==recipeId)[0].category;
   const className= `dev-ingredient-amount-${recipeId}`;
   
    axios.get(recipeLink).
    then(response => {
        const html= response.data;
        const $ = cheerio.load(html);
        ingredients=[];
        $('ul.list:not(.hide) > li', html).each(function(){
            const amount= $(this).find(`.${className}`).text().trim();
            const ingredientValue=$(this).find('.dev-ingredient-value').text();
            const ingredientKey=$(this).find('.dev-ingredient-key').text();
          
            ingredients.push({
                amount,
                ingredientValue,
                ingredientKey   
            })
        })
     const title= $('div.title >h1', html).text();
     const img=$('.swiper-slide> img', html).attr('data-src');
     descriptionSteps=[]
      $('div.description > p', html).each(function(){
        const description= $(this).text();
        const step= (descriptionSteps.length==0 ? 1 : descriptionSteps.length+1)
        descriptionSteps.push(
            {
                step,
                description

            }
        )

     })
        displayAll= [
            {
                id: recipeId,
                title: title,
                category: recipeCategory,
                img:img,
                ingredients,
                descriptionSteps: descriptionSteps,

            }
            ]            
   


    }).catch((err)=>  console.log(err))
 
    return displayAll;

}


// $('div.heading > div.title h1', html).each(function(){
//     const title= $(this).text();
//     displayRecipe.push({
//         title
//     })

//'ul[class=list] li'
