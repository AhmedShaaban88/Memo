import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';





@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('status', 'verified');
      }
    });


  }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signInWithFacebook() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  signUp(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
     return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    localStorage.removeItem('status');
    return this.afAuth.auth.signOut();

  }

  isLogin(): boolean {

    if (localStorage.getItem('status') !== null) {
    return true;
    }
    return false;
    }


  }

