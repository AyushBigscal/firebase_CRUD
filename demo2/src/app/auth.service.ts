// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { Book } from './book';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

constructor(private fs:Firestore){}

  login(username: string, password: string): boolean {
    // In a real application, validate credentials against a server or database.
    if (username === 'user' && password === 'password') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

addNote(book:Book){
  book.id = doc(collection(this.fs,'id')).id
  return addDoc(collection(this.fs,'Books'),book)
}

getBooks():Observable<Book[]>{
  let notesRef = collection(this.fs,'Books')
  return collectionData(notesRef,{idField:'id'}) as Observable<Book[]>

}

//delete books
deleteBook(book : Book){
  let docRef = doc(this.fs,`Books/${book.id}`);
  return deleteDoc(docRef)
}

//update books
updateBook(book:Book,books:any){
  let docRef = doc(this.fs,`Books/${book.id}`);
  return updateDoc(docRef,books)
}

}
