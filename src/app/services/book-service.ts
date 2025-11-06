import { Injectable, signal} from '@angular/core';
import { Book } from '../model/book';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiURL= 'http://localhost:3000/books';

  private booksState = signal<Book[]>([]);
  private editToBookState = signal<Book | null>(null);

  public  books = this.booksState.asReadonly();
  public editToBook = this.editToBookState.asReadonly();

  constructor(private http : HttpClient){
    this.loadBooks();

  }

  loadBooks(){
    this.http.get<Book[]>(this.apiURL).subscribe(data => {
      this.booksState.set(data)
    })
  }

  post(book : Book): Observable<Book>{
    return this.http.post<Book>(this.apiURL, book).pipe(
      tap((newBook) => this.booksState.update((currentBooks) => [...currentBooks, newBook])
    )
  );
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.apiURL}/${id}`).pipe(
      tap(() => {
        this.booksState.update((currentsBooks) => currentsBooks.filter((book) => book.id !== id))
      })
    )
  }

  update(bookToUpdate : Book): Observable<Book>{
    return this.http.put<Book>(`${this.apiURL}/${bookToUpdate.id}`, bookToUpdate).pipe(
      tap((updatedBook) => {
        this.booksState.update((currentBooks) =>
        currentBooks.map((book) =>
           book.id === updatedBook.id ? updatedBook: book)
      );
      })
    )
  }


  selectBookToEdit(book : Book){
    this.editToBookState.set(book)
  }

  clearBookToEdit(){
    this.editToBookState.set(null);
  }


}
