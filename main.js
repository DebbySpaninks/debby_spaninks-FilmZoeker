// console.log('All movies: ', movies); // test

const allMovies = movies;
const emptyMovieList = document.getElementById('movie-list'); // pak ul

// functie om movies toe te voegen aan de DOM
const addMoviesToDom = (movies) => {
    const movieItems = movies.map(movie => { // itereer over alle movies in movies.js
        const imdb = 'https://www.imdb.com/title/' + movie.imdbID;
        const link = document.createElement('a');
        const listItem = document.createElement('li');
        const img = document.createElement('img');
        listItem.classList.add('movie-list__item');
        img.classList.add('poster');
        img.src = movie.Poster;
        img.alt = movie.Title;
        link.href = imdb;
        link.target = '_blank';
        link.appendChild(img);
        listItem.appendChild(link);
        return listItem; // listItem incl. img en link
    });
    // movieItems.forEach(li => emptyMovieList.appendChild(li));
    emptyMovieList.append(...movieItems); // ipv forEach
};
addMoviesToDom(allMovies);

// functie met change event 
const handleOnChangeEvent = (event) => {
    switch (event.target.value) {
        case 'newest':
            filterNewestMovies();
            changeBackgroundColor('rgb(25, 29, 77)');
            break;
        case 'avengers':
            filterMovies('Avengers');
            changeBackgroundColor('rgb(14, 69, 83)');
            break;
        case 'xmen':
            filterMovies('X-Men');
            changeBackgroundColor('rgb(35, 46, 46)');
            break;
        case 'princess':
            filterMovies('Princess');
            changeBackgroundColor('rgb(83, 4, 77)');
            break;
        case 'batman':
            filterMovies('Batman');
            changeBackgroundColor('rgb(63, 10, 10)');
            break;
        default:
            console.log('Er zijn geen films gefilterd');
            break;
    }
};

// eventListeners functie voor radiobuttons
const addEventListeners = document.getElementsByName('filter');
addEventListeners.forEach(radio => radio.addEventListener('change', handleOnChangeEvent));

// functie om met lege movie-lijst te beginnen
const removeAllMovies = () => emptyMovieList.innerHTML = '';

// functie om title op h1 te laten zien
const titleH1 = (title) => document.querySelector('h1').innerText = title;

// functie om achtergrond-kleur te veranderen
const changeBackgroundColor = (color) => document.body.style.backgroundColor = color;

// functie om woord in movie-title te filteren
const filterMovies = (wordInMovieTitle) => {
    titleH1(wordInMovieTitle);
    const filteredMovies = movies.filter(movie => movie.Title.includes(wordInMovieTitle));
    removeAllMovies();
    addMoviesToDom(filteredMovies);
};

// functie om films van 2014 en nieuwer te filteren
const filterNewestMovies = () => {
    titleH1('2014 and newer');
    const filteredNewestMovies = movies.filter((movie) => parseInt(movie.Year) >= 2014);
    removeAllMovies();
    addMoviesToDom(filteredNewestMovies);
};