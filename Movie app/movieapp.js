const apiKey = '063b9c7527f084b77b36a00e91e16c01';  
const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=';

function fetchMovies() {
    let input = document.getElementById('searchInput').value;
    if(input) {
        fetch(apiUrl + input)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.error('Error:', error));
    } else {
        alert("Please enter a movie genre to search.");
    }
}

function displayMovies(movies) {
    const resultsSection = document.getElementById('results-section');
    resultsSection.innerHTML = ''; // Clear previous results
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
        `;
        resultsSection.appendChild(movieDiv);
    });
}