import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { USER_TYPE } from '../../utils/consts';
import { auth } from 'firebase';

@Injectable()
export class AuthProvider {

  profile: User;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
  ) {

  }


  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  signInWithTwitter() {
    return this.authLogin(new auth.TwitterAuthProvider());
  }

  signInWithFacebook() {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  authLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmailAndPassword(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(res => {
      this.updateUser(user);
    });
  }

  signUpWithPhonenumber(phoneNumber, appVerifier) {
    this.afAuth.auth.signInWithPhoneNumber(phoneNumber, appVerifier).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
  updateUser(data: User) {
    const user = this.getStoredUser();
    const userData: User = null;
    return this.afs.collection('users').doc(user.uid).set(userData);
  }

  getFirebaseUserData(uid): any {
    return this.afs.collection('users').doc(uid).get();
  }

  storeUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getStoredUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  isLoggedIn(): boolean {
    return !!this.getStoredUser();
  }

  signOut() {
    localStorage.removeItem('user');
    return this.afAuth.auth.signOut();
  }

  isBuyer(user): boolean {
    return user && user.type === USER_TYPE.buyer;
  }

  isSeller(user): boolean {
    return user && user.type === USER_TYPE.seller;
  }
}
