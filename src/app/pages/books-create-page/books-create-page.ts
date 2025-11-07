import { Component } from '@angular/core';
import { BooksForm } from "../../components/books-form/books-form";

@Component({
  selector: 'app-books-create-page',
  standalone: true,
  imports: [BooksForm],
  templateUrl: './books-create-page.html',
  styleUrl: './books-create-page.css',
})
export class BooksCreatePage {

}
