import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    constructor(private slService: ShoppingListService) {}

    private recipes: Recipe[]= [
        new Recipe('A Test Recipe',
         'just a test',
          'http://farm5.static.flickr.com/4083/5057134443_229647c320_z.jpg',
            [new Ingredient('Meat', 1),
            new Ingredient('Fench Fries', 20)]
        ),
        new Recipe('Jing Jiang Rose',
        'just a test',
         // tslint:disable-next-line:max-line-length
         'https://fthmb.tqn.com/vDi9vViauZTEeRLidioVOlb0F5U=/960x0/filters:no_upscale()/beef-and-vegetable-stir-fry-165955462-5834b0523df78c6f6a6af185.jpg',
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

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }
    updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
