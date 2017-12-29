import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) {
        
    }
    signupUser(email: string, pw: string) {
        firebase.auth().createUserWithEmailAndPassword(email, pw)
        .catch(error => console.log(error));
    }

    signinUser(email: string, pw: string) {
        firebase.auth().signInWithEmailAndPassword(email, pw)
        .then(
            response => {
                this.router.navigate(['/']);
                firebase.auth().currentUser.getToken().then(
                (token: string) => this.token = token
                );
            }
        )
        .catch(error => console.log(error));
    }


    getToken() {
        firebase.auth().currentUser.getToken().then(
            (token: string) => this.token = token
            );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }
}
