import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  bookForm:FormGroup;
  editForm:FormGroup;

  toshow=false;

  toEdit=false;


  bookObj :Book ={
    id:'',
    title: '',
    author: '',
    publishedyear:''
  }
 toggle(){
  this.toshow=true;
 }
  constructor(public authService: AuthService, private router: Router,private fb:FormBuilder) {
    this.bookForm = this.fb.group({
      id:['',Validators.required],
      title:['',Validators.required],
      author:['',Validators.required],
      publishedyear:['',Validators.required],
    })
    this.editForm = this.fb.group({
      edit_id:['',Validators.required],
      edit_title:['',Validators.required],
      edit_author:['',Validators.required],
      edit_publishedyear:['',Validators.required],
    })

  }

  ngOnInit(): void {

    this.getAllBooks();
  }

  bookData:any = [];
  bookDetails:any;
  // book-list.component.ts
  
  addBook(){
    const { value } = this.bookForm
    console.log(value);
    this.bookObj.id='',
    this.bookObj.title=value.title,

    this.bookObj.author=value.author,
    this.bookObj.publishedyear=value.publishedyear


    this.authService.addNote(this.bookObj).then((book)=>{
      if(book){
        alert("book added successfully");
        this.bookForm.reset();
      }
    })
    this.toshow=false;  
  }
      getAllBooks(){
        this.authService.getBooks().subscribe((res:Book[])=>{
          console.log(res);
          this.bookData =res;

        })
      }





  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  //for manual
  // deleteBook(id: number, i: number): void {
  //   this.books.splice(i, 1);
  //   // this.books = this.books.filter(book => book.id !== id);
  // }

deleteBook(book:Book){
  let decision= confirm("Are Sure want to delete this Book ? ");
  if(decision ==true){
    this.authService.deleteBook(book);
  }
}



getAllDetails(book:Book){
  this.bookDetails=book;
  this.toEdit=true;
 console.log(this.bookDetails);

}


//update data
updateBook(book: Book) {
  const { value } = this.editForm;

  // Create an updated book object
 
  (this.bookObj.id=book.id),
  (this.bookObj.title=value.edit_title),
  (this.bookObj.author=value.edit_author),
  (this.bookObj.publishedyear=value.edit_publishedyear)
  this.authService.updateBook(book,this.bookObj).then(()=>{
    alert("book Updated Successfully");
  });
  // Reset the form and hide the edit form
  this.editForm.reset();
  this.toEdit = false;
}
 searchText:string = '';

 onSearchTextEntered(searchValue: string){
  this.searchText = searchValue;
  console.log(this.searchText);
  
 }


}
