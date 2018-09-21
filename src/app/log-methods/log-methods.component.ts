import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../Services/firebase.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-log-methods',
  templateUrl: './log-methods.component.html',
  styleUrls: ['./log-methods.component.sass']
})

export class LogMethodsComponent implements OnInit {
  hideWelcome = false;
  showSignIn = false;
  showSignUp = false;
  error = false;
  signinForm: FormGroup;
  signUpForm: FormGroup;
  errorSingInForm = null;
  correctUname = true;
  correctEmail = true;
  correctPassword = true;
  identicalPassword = true;
  errorSignUpForm = null;
  appLang = 'عربي';
  constructor(private fs: FirebaseService, private router: Router, private fb: FormBuilder, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    localStorage.setItem('lang', 'en');
  }

  ngOnInit() {
  }
  switchLanguage() {
    if (this.appLang === 'عربي') {
      this.translate.use('ar');
      localStorage.setItem('lang', 'ar');
      this.appLang = 'English';
    } else {
      this.appLang = 'عربي';
      this.translate.use('en');
      localStorage.setItem('lang', 'en');
    }

  }
  showSignInMethods() {
    this.hideWelcome = true;
  }


  checkPrev() {
      if (this.showSignIn === true) {
        this.showSignIn = false;
      } else if (this.showSignUp === true) {
        this.showSignUp = false;
      } else {
        this.hideWelcome = false;
      }
      this.error = false;
      this.errorSingInForm = null;
      this.errorSignUpForm = null;
      this.correctUname = true;
      this.correctEmail = true;
      this.correctPassword = true;
      this.identicalPassword = true;
  }

  signInWithFacebook() {
    this.fs.signInWithFacebook().then(res => { this.router.navigate(['/home'] ); this.error = false; } , err => this.error = true);
  }
  signInWithGoogle() {
    this.fs.signInWithGoogle().then(res => { this.router.navigate(['/home'] ); this.error = false; } , err => this.error = true);
  }
  signInRegular() {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    });
    this.showSignIn = true;
  }
  checkUser() {
    this.fs.signInRegular(this.signinForm.get('email').value, this.signinForm.get('password').value)
      .then(value => this.router.navigate(['/home']), err => this.errorSingInForm = err.code.toString().slice(5));
  }
  signUpRegular() {
    this.signUpForm = this.fb.group({
      uname: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z\\-]+$')]],
      uemail: ['', [Validators.email, Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      upassword: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$')]],
      conf_password: ['', [Validators.required, Validators.minLength(8)]]

    });
    this.showSignUp = true;

  }
  createUser() {
    this.correctUname = true;
    this.correctEmail = true;
    this.correctPassword = true;
    this.identicalPassword = true;
  if (this.signUpForm.get('uname').status === 'INVALID') {
      this.correctUname = false;
  }
    if (this.signUpForm.get('uemail').status === 'INVALID') {
      this.correctEmail = false;
    }
    if (this.signUpForm.get('upassword').status === 'INVALID') {
      this.correctPassword = false;
    }
    if (this.signUpForm.get('upassword').value !== this.signUpForm.get('conf_password').value) {
      this.identicalPassword = false;
    }
    if (this.correctUname && this.correctEmail && this.correctPassword && this.identicalPassword) {
      this.fs.signUp(this.signUpForm.get('uemail').value, this.signUpForm.get('upassword').value)
        .then(value => this.router.navigate(['/home']), err => this.errorSignUpForm = err.code.toString().slice(5));
    }


  }



}
