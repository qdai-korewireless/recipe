import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { filter } from 'rxjs/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  loadedFeature = 'recipe';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyBgAF0CtfXFaSyeGNlheZt-onoXMilbcw4',
      authDomain: 'recipe-e542e.firebaseapp.com'
    })
  }
}
