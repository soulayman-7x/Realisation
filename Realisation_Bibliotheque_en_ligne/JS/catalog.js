
let library = JSON.parse(localStorage.getItem('library')) || [
  { code: 0, title: "STORY OF THE 7X", author: "SOULAYMAN 7X", year: 2019, available: true, price: 550, image: "BOOKS/7X-BOOK (1).png" },
  { code: 1, title: "Dune", author: "Frank Herbert", year: 1965, available: true, price: 300, image: "BOOKS/Dune.png" },
  { code: 2, title: "Great Expectations", author: "Charles Dickens", year: 1861, available: true, price: 280, image: "BOOKS/Great-Expectations.png" },
  { code: 3, title: "Jane Eyre", author: "Charlotte Brontë", year: 1847, available: true, price: 270, image: "BOOKS/Jane-Eyre.png" },
  { code: 4, title: "Meditations", author: "Marcus Aurelius", year: 180, available: true, price: 250, image: "BOOKS/Meditations.png" },
  { code: 5, title: "Moby Dick", author: "Herman Melville", year: 1851, available: true, price: 290, image: "BOOKS/Moby-Dick.png" },
  { code: 6, title: "Pride and Prejudice", author: "Jane Austen", year: 1813, available: true, price: 260, image: "BOOKS/Pride-and-Prejudice.png" },
  { code: 7, title: "The 7 Habits", author: "Stephen R. Covey", year: 1989, available: true, price: 340, image: "BOOKS/The-7-Habits.png" },
  { code: 8, title: "The Art of War", author: "Sun Tzu", year: -500, available: true, price: 220, image: "BOOKS/The-Art-of-War.png" },
  { code: 9, title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, available: true, price: 400, image: "BOOKS/The-Lord-of-the-Rings.png" },
  { code: 10, title: "Think and Grow Rich", author: "Napoleon Hill", year: 1937, available: true, price: 350, image: "BOOKS/Think-and-Grow-Rich.png" },
  { code: 11, title: "Wuthering Heights", author: "Emily Brontë", year: 1847, available: true, price: 275, image: "BOOKS/Wuthering-Heights.png" },
];

function showBooks(filterBooks = library) {
  let container = document.getElementById('books-container');
  container.innerHTML = '';

  let expensiveCount = 0;

  filterBooks.forEach(book => {
    let card = document.createElement('div');
    card.className = 'card';

    if (book.price > 300) {
      card.className = 'expensive card';
      expensiveCount++
    }

    const reserveButton = book.available
      ? `<button class="to-book" onclick="reserveBook(${book.code})">To book</button>`
      : `<div class="reserved unreserved" data-code="${book.code}"></div>`
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}" class="book-img">
      <h3>${book.title}</h3>
      <p class="author">Author: ${book.author}</p>
      <p class="year">Year : ${book.year}</p>
      <p class="price">Price : ${book.price} DH</p>
      ${reserveButton}
      <div class="bottom-card">
      <p class="available">Available : ${book.available ? '✅' : '❌'}</p>
      <button class="btn" onclick="deleteBook(${book.code})"><i class="fa-solid fa-trash-can"></i></button>
    `;
    container.appendChild(card);
  });
  updateState(expensiveCount);

  //unreserved 
  document.querySelectorAll('.unreserved').forEach(div => {
    div.addEventListener('dblclick', function () {
      const code = Number(this.dataset.code);
      const index = library.findIndex(book => book.code === code);
      if (index !== -1) {
        library[index].available = true;
        localStorage.setItem('library', JSON.stringify(library));
        showBooks();
      }
    });
  });
}

// Sort buttons

document.getElementById("trierAsc").addEventListener("click", function() {
  const sortedBooks = [...library].sort((a, b) => a.title.localeCompare(b.title));
  showBooks(sortedBooks)
});

document.getElementById("trierDesc").addEventListener("click", function() {
  const sortedBooks = [...library].sort((a, b) => b.title.localeCompare(a.title));
  showBooks(sortedBooks)
});

//Delete function
function deleteBook(code) {
  let bookIndex = library.findIndex(book => book.code === code);
  if (bookIndex !== -1 && confirm('Are you sure you want to delete this book?')) {
    library.splice(bookIndex, 1);
    localStorage.setItem('library', JSON.stringify(library));
    showBooks();
  }
}

//reserve function
function reserveBook(code) {
  const index = library.findIndex(book => book.code === code);
  if (index !== -1) {
    library[index].available = false;
    localStorage.setItem('library', JSON.stringify(library));
    showBooks();
  }
}

function updateState(expensiveCount) {
  let total = library.length;
  let available = library.filter(book => book.available).length;
  document.getElementById('stats').innerHTML = `
    <p>Total Books : <span> ${total}</span></p>
    <p>Expensive Books : <span>${expensiveCount}</span></p>
    <p>Available Books : <span>${available}</span></p>
  `;
}


//Search input function 
document.getElementById('search-input').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const filteredBooks = library.filter(book =>
    book.title.toLowerCase().includes(searchTerm) ||
    book.author.toLowerCase().includes(searchTerm)
  );
  showBooks(filteredBooks);
});

showBooks();