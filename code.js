const book = {
  init: function (book_name, author, gerne, pages, isRead) {
    this.book_name = book_name;
    this.author = author;
    this.gerne = gerne;
    this.pages = pages;
    this.isRead = isRead;
    return this;
  },

  isReadfn: function () {
    this.isRead = !this.isRead;
    isReadText = document.getElementById("isReadText");
    isReadText.textContent = this.isRead ? "Yes" : "No";
  },

  remove_btn_fn: function () {
    book_list_container.removeChild(this.bookCard);
  },
};

// create this object from a pop-up form
const lotr = Object.create(book).init(
  (book_name = "Lord of the Rings"),
  (author = "John"),
  (gerne = "Fantasy"),
  (pages = 1234),
  (read = false)
);

let book_list_container = document.querySelector(".books_list_container");

let appendBookCard = function (book) {
  // Create a container for the book card and give it a class
  const bookCardDiv = document.createElement("div");
  bookCardDiv.classList.add("book_card");

  // Function that creates and adds the info sections on the card
  const createBookCardInfo = (title, info, id) => {
    // Create book_card_info div
    const book_card_info = document.createElement("div");
    book_card_info.classList.add("book_card_info");

    // Add header and text elements
    const header = document.createElement("h2");
    header.textContent = title;

    const text = document.createElement("p");
    text.setAttribute("id", id);
    text.textContent = info;

    // Append header, text and hr to the div
    book_card_info.appendChild(header);
    book_card_info.appendChild(text);
    if (title != "Read:") {
      const hr = document.createElement("hr");
      book_card_info.appendChild(hr);
    }

    // Add all the info to the book_card_info div
    bookCardDiv.appendChild(book_card_info);
  };

  // Create each book_card_info block
  createBookCardInfo("Name:", book.book_name);
  createBookCardInfo("Author:", book.author);
  createBookCardInfo("Genre:", book.gerne);
  createBookCardInfo("Pages:", book.pages);
  createBookCardInfo("Read:", book.isRead ? "Yes" : "No", "isReadText");

  // Create remove button and Read button container
  bookCardBtnDiv = document.createElement("div");
  bookCardBtnDiv.classList.add("BookCardBtnContainer");

  // create the remove button
  bookCardRemoveBtn = document.createElement("button");
  bookCardRemoveBtn.classList.add("bookCardBtn");
  bookCardRemoveBtn.textContent = "Remove Book";

  // create the Read button
  bookCardisReadBtn = document.createElement("button");
  bookCardisReadBtn.classList.add("bookCardBtn");
  bookCardisReadBtn.textContent = "Is read";

  // append the buttons to their container
  bookCardBtnDiv.appendChild(bookCardRemoveBtn);
  bookCardBtnDiv.appendChild(bookCardisReadBtn);

  // append the button container to the book card
  bookCardDiv.appendChild(bookCardBtnDiv);

  // Add book card to the books_list_container
  book_list_container.appendChild(bookCardDiv);
  book.bookCard = bookCardDiv;

  // add an event listener for the button
  bookCardRemoveBtn.addEventListener("click", book.remove_btn_fn.bind(book));

  // add an event listener for the isRead button
  bookCardisReadBtn.addEventListener("click", book.isReadfn.bind(book));
};

// When the user completes the book form and clicks add book, the function below should be called
appendBookCard(lotr);

const newBookBtn = document.getElementById("newBookBtn");
const bookInfoDialog = document.getElementById("addBookDialog");
const confirmBtn = bookInfoDialog.querySelector("#confirmBtn");

newBookBtn.addEventListener("click", () => {
  bookInfoDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
bookInfoDialog.addEventListener("close", (e) => {
  console.log(
    bookInfoDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${bookInfoDialog.returnValue}.` // Have to check for "default" rather than empty string
  );
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const bookName = document.getElementById("bookName").value;
  const authorName = document.getElementById("authorName").value;
  const bookGenre = document.getElementById("bookGenre").value;
  const bookPages = document.getElementById("bookPages").value;

  bookObject = Object.create(book).init(
    (book_name = bookName),
    (author = authorName),
    (gerne = bookGenre),
    (pages = bookPages),
    (read = false)
  );
  bookInfoDialog.close(bookObject);
  document.getElementById("newBookForm").reset();

  appendBookCard(bookObject);
});
