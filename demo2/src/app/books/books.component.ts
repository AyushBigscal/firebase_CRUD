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


  bookObj :Book ={
    id:'',
    title: '',
    author: '',
    publishedyear:''
  }

  constructor(private authService: AuthService, private router: Router,private fb:FormBuilder) {
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
  books: any[] = [
    {
      id: 1,
      title: 'Harry Potter and Crazy Creature',
      author: 'J.K.Rowling',
      publishedYear: 2006,
    },
    {
      id: 2,
      title: 'Amazing Spider Man',
      author: 'Sandeep Yadav',
      publishedYear: 2023,
    },
    {
      id: 3,
      title: 'Learn Angular in 1 Day',
      author: 'Rohit Vishwakarma',
      publishedYear: 2022,
    },
    {
      id: 4,
      title: 'Web dev 3 in Hindi',
      author: 'Ayush Singh',
      publishedYear: 2015,
    },
    {
      id: 5,
      title: 'Mystery in the dark',
      author: 'Mr. Unknwown',
      publishedYear: 2019,
    },
    {
      id: 6,
      title: 'The Temple Run',
      author: 'William Shakespeare',
      publishedYear: 2021,
    },
  ];

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
    })}
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
 console.log(this.bookDetails);

}


//update data
updateBook(book:Book){
  const { value } =this.editForm
  console.log(value);

  (this.bookObj.id=book.id),
  (this.bookObj.title=value.edit_title),
  (this.bookObj.author=value.edit_author),
  (this.bookObj.publishedyear=value.edit_publishedyear)
  this.authService.updateBook(book,this.bookObj).then(()=>{
    alert("book Updated Successfully");
  });
  this.editForm.reset();

}

}
