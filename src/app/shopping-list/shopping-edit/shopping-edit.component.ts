import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription:  Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('f') form: NgForm;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onSubmit(form: NgForm) {

    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
      this.form.reset();
    }
    else {
      this.shoppingListService.addIngredient(newIngredient);
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear(): void {
    this.form.reset();
    this.editMode = false;
  }
  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
