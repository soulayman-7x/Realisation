// load library from Local Storage
let library = JSON.parse(localStorage.getItem('library')) || [];

document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const book = {
        code: Number(document.getElementById('code').value),
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        year: Number(document.getElementById('year').value),
        price: Number(document.getElementById('price').value),
        available: document.getElementById('available').checked,
        image: document.getElementById('image').value.trim() || '../BOOKS/Dune.png'
    };

    const imageInput = document.getElementById('image');
    const imagePath = imageInput.value.split('\\').pop();

    if (imagePath) {
        book.image = 'BOOKS/' + imagePath;
    } else {
        book.image = '../BOOKS/default.png';
    }

    // duplicate codes Checking 
    const existingBook = library.find(b => b.code === book.code);

    if (existingBook) {
        alert("⚠️This code has already been used! Choose another code.");
        return;
    }

    library.push(book);
    localStorage.setItem('library', JSON.stringify(library));

    alert('book added successfully!!');
    this.reset();
});