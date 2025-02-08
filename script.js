const myLibrary = [];

const container = document.querySelector(".container");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const titleInput = document.querySelector("#book-title");
const titleError = document.querySelector("#book-title + .error");
const authorInput = document.querySelector("#book-author");
const authorError = document.querySelector("#book-author + .error");
const pagesInput = document.querySelector("#book-pages");
const pagesError = document.querySelector("#book-pages + .error");
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
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("book-title");
    titleDiv.textContent = book.title;

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("book-author");
    authorDiv.textContent = book.author;

    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("book-pages");
    pagesDiv.textContent =
      book.numPages > 1 ? `${book.numPages} pages` : `${book.numPages} page`;

    const textDiv = document.createElement("div");
    textDiv.classList.add("book-description");
    textDiv.appendChild(titleDiv);
    textDiv.appendChild(authorDiv);
    textDiv.appendChild(pagesDiv);

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

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("book-buttons");
    buttonsDiv.appendChild(statusBtn);
    buttonsDiv.appendChild(removeBtn);

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.dataset.index = bookDivs.length;
    bookDiv.appendChild(textDiv);
    bookDiv.appendChild(buttonsDiv);

    bookDivs.push(bookDiv);
  });

  container.replaceChildren(...bookDivs);
}

function addBookToLibrary(title, author, numPages, isRead) {
  const newBook = new Book(title, author, numPages, isRead);
  myLibrary.push(newBook);
  displayLibrary();
}

function showTitleError() {
  titleError.classList.add("active");

  if (titleInput.validity.valueMissing) {
    titleError.textContent = "The title cannot be empty.";
  } else if (titleInput.validity.patternMismatch) {
    titleError.textContent =
      "The title cannot have leading or trailing spaces.";
  }
}

function showAuthorError() {
  authorError.classList.add("active");

  if (authorInput.validity.valueMissing) {
    authorError.textContent = "The author cannot be empty.";
  } else if (authorInput.validity.patternMismatch) {
    authorError.textContent =
      "The author name cannot have leading or trailing spaces.";
  }
}

function showPagesError() {
  pagesError.classList.add("active");

  if (pagesInput.validity.valueMissing) {
    pagesError.textContent = "The number of pages cannot be empty.";
  } else if (pagesInput.validity.patternMismatch) {
    pagesError.textContent = "The number of pages must be a positive integer.";
  }
}

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  dialog.close();
});

titleInput.addEventListener("input", () => {
  if (titleInput.validity.valid) {
    titleError.classList.remove("active");
    titleError.textContent = "";
  } else {
    showTitleError();
  }
});

authorInput.addEventListener("input", () => {
  if (authorInput.validity.valid) {
    authorError.classList.remove("active");
    authorError.textContent = "";
  } else {
    showAuthorError();
  }
});

pagesInput.addEventListener("input", () => {
  if (pagesInput.validity.valid) {
    pagesError.classList.remove("active");
    pagesError.textContent = "";
  } else {
    showPagesError();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    titleInput.validity.valid &&
    authorInput.validity.valid &&
    pagesInput.validity.valid
  ) {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      parseInt(pagesInput.value),
      readInput.checked
    );
    form.reset();
    dialog.close();
  } else {
    if (!titleInput.validity.valid) {
      showTitleError();
    }

    if (!authorInput.validity.valid) {
      showAuthorError();
    }

    if (!pagesInput.validity.valid) {
      showPagesError();
    }
  }
});

addBookToLibrary("Atomic Habits", "James Clear", 306, true);

addBookToLibrary(
  "How to Stop Worrying and Start Living",
  "Dale Carnegie",
  298,
  false
);
