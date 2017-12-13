import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[]= [
        new Recipe('A Test Recipe', 'just a test', 'http://farm5.static.flickr.com/4083/5057134443_229647c320_z.jpg')
      ];
    getRecipes() {
        return this.recipes.slice();  // call slice will make a copy of array
    }


}
