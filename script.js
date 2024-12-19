const myLibrary = [];

const container = document.querySelector(".container");

function Book(title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

function displayLibrary() {
  const bookDivs = [];

  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");

    const textDiv = document.createElement("div");
    textDiv.classList.add("book-description");
    bookDiv.appendChild(textDiv);

    const titleDiv = document.createElement("div");
    titleDiv.textContent = book.title;
    titleDiv.classList.add("book-title");
    textDiv.appendChild(titleDiv);

    const authorDiv = document.createElement("div");
    authorDiv.textContent = book.author;
    authorDiv.classList.add("book-author");
    textDiv.appendChild(authorDiv);

    const pagesDiv = document.createElement("div");
    pagesDiv.textContent = `${book.numPages} pages`;
    pagesDiv.classList.add("book-pages");
    textDiv.appendChild(pagesDiv);

    bookDivs.push(bookDiv);
  });

  container.replaceChildren(...bookDivs);
}

function addBookToLibrary(title, author, numPages, isRead) {
  const newBook = new Book(title, author, numPages, isRead);
  myLibrary.push(newBook);
  displayLibrary();
}

addBookToLibrary("Atomic Habits", "James Clear", 306, true);

addBookToLibrary(
  "How to Stop Worrying and Start Living",
  "Dale Carnegie",
  298,
  false
);
