import { Component, effect, inject, signal } from '@angular/core';
import { BookService } from '../../services/book-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../../model/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './books-form.html',
  styleUrl: './books-form.css',
})
export class BooksForm {
  private fb = inject(FormBuilder);
  bookService = inject(BookService);
  private router = inject(Router);

  isEditMode = signal(false);
  private bookToEdit: Book | null= null;

  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    genero: ['', Validators.required]
  })

  constructor(){

    effect(() => {
      this.bookToEdit = this.bookService.editToBook();
      if(this.bookToEdit){
        this.isEditMode.set(true);
        this.form.patchValue(this.bookToEdit);
      }else{
        this.isEditMode.set(false);
        this.form.reset();
      }
    });
  }


  saveBook(){
    if(this.form.invalid) return;

    const formValue= this.form.value;

    if(this.isEditMode() && this.bookToEdit){

      const updatedBook = {...this.bookToEdit, ...formValue} as Book;

      this.bookService.update(updatedBook).subscribe(() => {

        this.bookService.clearBookToEdit();
        this.router.navigate(['/books']);
      })

    }else{
      this.bookService.post(formValue as Book).subscribe(() => {
         this.form.reset();
         this.router.navigate(['/books'])
      })

    }
  }

  cancelEdit(){
    this.bookService.clearBookToEdit();
    this.router.navigate(['/books']);
  }
}
