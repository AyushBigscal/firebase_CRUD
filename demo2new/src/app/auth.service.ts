
import { Injectable } from '@angular/core';
import { Book } from './book';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService  { 
 isLoggedIn: boolean = false;
 isAdmin: boolean = false;
 isUser :boolean = false
 isNewUser:boolean = false




constructor(private fs:Firestore,private router: Router){}

login(username:any, password:any): boolean {
    // In a real application, validate credentials against a server or database.
    if (username === 'user' && password === 'password') {
      this.isLoggedIn = true;
      this.isAdmin = true;
      this.isUser=false;
      return true;
    }else if (username === 'ayush' && password === 'bigscal') {
      this.isLoggedIn = true;
      this.isAdmin = false;
      this.isUser=true;
        // this.router.navigate(['/books']);
        return true;
      }
      return false;
    }
  
    // signup(username:string,password:any):boolean{
    //   if(username === 'sann' && password === 'sann'){
    //     this.isUser = true
       
    //     this.isNewUser = true
    //     this.isLoggedIn = true
    //     return true
    //   }else{
    //     return false
    //   }
    // }


  logout(): void {

    this.isLoggedIn = false;
    this.isAdmin = false;
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
signin(username:any,password:any):boolean{
  if(username !== '' && password !== ''){
    this.isUser = true
    this.isNewUser = true
    this.isLoggedIn = true

    return true
  }else{
    return false
  }
}
}