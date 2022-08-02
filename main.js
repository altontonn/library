/* eslint max-classes-per-file: ["error", 3] */

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') == null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class task {
  static currentBooks() {
    const books = Store.getBooks();
    books.forEach((book) => task.addBookList(book));
  }

  static addBookList(book) {
    const list = document.querySelector('#list-book');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
      <td>${book.author}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">REMOVE</a></td>`;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.firstContainer');
    const form = document.querySelector('#book-input');
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', task.currentBooks);
document.querySelector('#book-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  if (title === '' || author === '') {
    task.showAlert('fill in all the fields');
  } else {
    const book = new Books(title, author);
    task.addBookList(book);
    Store.addBook(book);
    task.showAlert('book added');
    task.clearField();
  }
});

document.querySelector('#list-book').addEventListener('click', (e) => {
  task.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  task.showAlert('Book Removed');
});
