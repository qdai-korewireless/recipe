import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]= [
    new Recipe('A Test Recipe', 'just a test', 'http://farm5.static.flickr.com/4083/5057134443_229647c320_z.jpg')
  ];

  @Output() getRecipeDetail = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit() {
  }

  showRecipeDetail(recipe: Recipe) {
    this.getRecipeDetail.emit(recipe);
  }

}
