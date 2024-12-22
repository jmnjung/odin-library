const myLibrary = [];

const container = document.querySelector(".container");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const titleInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const pagesInput = document.querySelector("#book-pages");
const readInput = document.querySelector("#book-read");
const addBtn = document.querySelector("dialog + button");
const closeBtn = document.querySelector(".close-dialog");

class Book {
  constructor(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
  }

  changeStatus() {
    this.isRead = !this.isRead;
  }
}

function displayLibrary() {
  const bookDivs = [];

  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.dataset.index = bookDivs.length;

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

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("book-buttons");
    bookDiv.appendChild(buttonsDiv);

    const statusBtn = document.createElement("button");
    statusBtn.textContent = book.isRead ? "✅" : "❌";
    statusBtn.addEventListener("click", () => {
      book.changeStatus();
      statusBtn.textContent = book.isRead ? "✅" : "❌";
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑️";
    removeBtn.addEventListener("click", () => {
      myLibrary.splice(parseInt(bookDiv.dataset.index), 1);
      displayLibrary();
    });

    buttonsDiv.appendChild(statusBtn);
    buttonsDiv.appendChild(removeBtn);

    bookDivs.push(bookDiv);
  });

  container.replaceChildren(...bookDivs);
}

function addBookToLibrary(title, author, numPages, isRead) {
  const newBook = new Book(title, author, numPages, isRead);
  myLibrary.push(newBook);
  displayLibrary();
}

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  form.reset();
  dialog.close();
});

form.addEventListener("submit", () => {
  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    parseInt(pagesInput.value),
    readInput.checked
  );
  form.reset();
});

addBookToLibrary("Atomic Habits", "James Clear", 306, true);

addBookToLibrary(
  "How to Stop Worrying and Start Living",
  "Dale Carnegie",
  298,
  false
);
