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

    const fileInput = document.getElementById('image');
    const file = fileInput.files[0]; //The first image selected by the user

    if (file) {
        const reader = new FileReader(); //To create an object that reads image content from the user's device
        reader.onload = function (event) {
            book.image = event.target.result;
            saveBook(book);
        };
        reader.readAsDataURL(file); //Convert the file to DATA
        return;
        book.image = '../BOOKS/default.png';
    }

    function saveBook(book) {
        const existingBook = library.find(b => b.code === book.code);
        if (existingBook) {
            alert("⚠️This code has already been used! Choose another code.");
            return;
        }

        library.push(book);
        localStorage.setItem('library', JSON.stringify(library));
        alert('book added successfully!!');
        document.getElementById('book-form').reset();
    }
});