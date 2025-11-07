import { Routes } from '@angular/router';
import { BooksListPage } from './pages/books-list-page/books-list-page';
import { BooksCreatePage } from './pages/books-create-page/books-create-page';

export const routes: Routes = [
  {path: 'books', component: BooksListPage},
  {path: 'newBook', component:BooksCreatePage},
  {path: '', redirectTo: 'books', pathMatch: 'full'}
];
