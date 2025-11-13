const apiKey = "957e7237";

// Get HTML elements
const moviesContainer = document.getElementById("movies");
const searchBox = document.getElementById("search-box");

// Function to get movies from the API
function fetchMovies(query = "batman") {
    // Build the URL using the search word
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

    // Call the API using fetch()
    fetch(url)
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            // Clear previous content before showing new movies
            moviesContainer.innerHTML = "";

            // Check if there are results
            if (data.Search) {
                // Loop through all movies found
                data.Search.forEach(movie => {
                    // Create a new <div> for each movie
                    const div = document.createElement("div");
                    div.className = "movie";

                    // Conditional image: use placeholder if no poster
                    const image =
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/300x400?text=No+Image";

                    // Add movie info inside the div
                    div.innerHTML = `
            <img src="${image}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
          `;

                    // Add this movie div to the page
                    moviesContainer.appendChild(div);
                });
            } else {
                // If no movies found
                moviesContainer.innerHTML = "<p>No movies found</p>";
            }
        })
        .catch(error => {
            console.error("Error while fetching:", error);
        });
}

// Show default movies when the page loads
window.addEventListener("load", () => {
    fetchMovies();
});

//  Search dynamically while typing
searchBox.addEventListener("input", () => {
    const text = searchBox.value.trim();

    // If user types more than 2 letters → search
    if (text.length > 2) {
        fetchMovies(text);
    }
    // If input is empty → show default movies again
    else if (text.length === 0) {
        fetchMovies();
    }
});
