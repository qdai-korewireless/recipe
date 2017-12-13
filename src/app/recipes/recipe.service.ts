import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    constructor(private slService: ShoppingListService) {}
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[]= [
        new Recipe('A Test Recipe',
         'just a test',
          'http://farm5.static.flickr.com/4083/5057134443_229647c320_z.jpg',
            [new Ingredient('Meat', 1),
            new Ingredient('Fench Fries', 20)]
        )
      ];
    getRecipes() {
        return this.recipes.slice();  // call slice will make a copy of array
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

}
