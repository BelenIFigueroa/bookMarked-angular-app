import { Component } from '@angular/core';
import { BooksList } from "../../components/books-list/books-list";

@Component({
  selector: 'app-books-list-page',
  standalone: true,
  imports: [BooksList],
  templateUrl: './books-list-page.html',
  styleUrl: './books-list-page.css',
})
export class BooksListPage {

}

