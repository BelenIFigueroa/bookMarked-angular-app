import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Book } from '../../model/book';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-list.html',
  styleUrl: './books-list.css',
})
export class BooksList {

  private router = inject(Router);
  bookService = inject(BookService);

  books = this.bookService.books;


  deleteBook(id: number){
    this.bookService.delete(id).subscribe({
      next: () => {
        console.log('Libro eliminado con exito!');
      },
      error: (err) => {
        console.log('Ocurrio un error: ', err);
      }
    })

  }

  editBook(updatedBook : Book){
    this.bookService.selectBookToEdit(updatedBook);
    this.router.navigate(['/newBook'])
  }



}
