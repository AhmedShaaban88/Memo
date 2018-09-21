import { Component, OnInit, NgZone } from '@angular/core';
import {FirebaseService} from '../Services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

interface Notes {
  title: string;
  content: string;
  dateTime: string;
  key?: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  userName: string;
  photourl: string;
  notesRef: AngularFireList<Notes>;
  notes: Observable<Notes[]>;
  notesLength: number;
  userID: string;
  noteAddForm: FormGroup;
  noteUpdateForm: FormGroup;
  hideAddForm: string;
  hideUpdateForm: string;
  updateKey: string;
  constructor(private fs: FirebaseService, private afa: AngularFireAuth, private db: AngularFireDatabase, private fb: FormBuilder, private translate: TranslateService) {
    this.afa.user.subscribe(user => {
      this.userID = user.uid;
    this.userName = user.displayName || user.email;
    this.photourl = user.photoURL || '../../assets/icons8-customer-64.png';
    this.notesRef = this.db.list<Notes>(`notes/${this.userID}`,
        ref => ref.orderByChild('dateTime'));
    this.notes = this.notesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))

      ),
      tap(value => this.notesLength = value.length)
    );
    });

    this.translate.setDefaultLang(localStorage.getItem('lang'));
    if (NgZone.isInAngularZone() === false){
      location.reload();
    }
  }
  ngOnInit() {
  this.noteAddForm = this.fb.group({
    title: [''],
    content: ['', Validators.required]
  });
    this.noteUpdateForm = this.fb.group({
      update_title: [''],
      update_content: ['', Validators.required]
    });
  }
  logout() {
    this.fs.signOut();
  }
  showNewNote() {
    this.hideAddForm = 'block';
    (<HTMLElement>document.getElementsByClassName('card')[0]).style.display = 'none';
    this.noteAddForm.setValue({
      'title': '',
      'content': ''
    });
    (<HTMLInputElement>document.getElementById('title')).value  = '';
    document.getElementsByTagName('textarea')[0].value  = '';

  }
  hideNewNote() {
    this.hideAddForm = 'none';
    (<HTMLElement>document.getElementsByClassName('card')[0]).style.display = 'block';
  }
  showUpdateNote(note) {
    this.hideUpdateForm = 'block';
    (<HTMLElement>document.getElementsByClassName('card')[0]).style.display = 'none';
    this.updateKey = note.key;
    this.noteUpdateForm.setValue({
      'update_title': note.title,
      'update_content': note.content
    });
    (<HTMLInputElement>document.getElementById('update_title')).value  = note.title;
    document.getElementsByTagName('textarea')[1].value  = note.content;
  }
  hideUpdateNote() {
    this.hideUpdateForm = 'none';
    (<HTMLElement>document.getElementsByClassName('card')[0]).style.display = 'block';
    this.updateKey = undefined;
  }
  addNote() {
    if (this.noteAddForm.status === 'VALID') {
      this.notesRef.push(
        {
          title: this.noteAddForm.get('title').value || 'No title'
          , content: this.noteAddForm.get('content').value,
          dateTime: Date()
        });
      this.hideAddForm = 'none';
      (<HTMLElement>document.getElementsByClassName('card')[0]).style.display = 'block';
      (<HTMLInputElement>document.getElementById('title')).value  = '';
      document.getElementsByTagName('textarea')[0].value  = '';
    }

  }
  deleteNote(note) {
    this.notesRef.remove(note);
  }
  deleteAll() {
    if (this.notesLength > 0) {
      this.notesRef.remove();
    }
  }
  updateNote() {
    (<HTMLElement>document.getElementsByClassName('card')[0]).style.display = 'none';
    if (this.noteUpdateForm.status === 'VALID') {
      this.notesRef.update(this.updateKey, {
        title: this.noteUpdateForm.get('update_title').value || 'No title'
        , content: this.noteUpdateForm.get('update_content').value,
        dateTime: Date()
      });
      this.updateKey = undefined;
      this.hideUpdateForm = 'none';
      (<HTMLElement>document.getElementsByClassName('card')[0]).style.display = 'block';
    }

  }
}
