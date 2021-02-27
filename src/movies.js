// Iteration 1: All directors? - Get the array of all directors.

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?
// {
//     "title": "The Shawshank Redemption",
//     "year": 1994,
//     "director": "Frank Darabont",
//     "duration": "2h 22min",
//     "genre": [
//       "Crime",
//       "Drama"
//     ],
//     "rate": 9.3
//   }
function getAllDirectors(movies) {
  let directors = movies.map(function (movie) {
    return movie.director;
  });
  return directors;
}
getAllDirectors(movies);
// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(arrMovies, genre, nameDirector) {
  let arrSpielbergMovie = arrMovies.filter(function (movie) {
    if (movie.director === "Steven Spielberg") return true;
    return false;
  });
  if (arrSpielbergMovie.length === 0) return 0;
  let arrSpielDrama = arrSpielbergMovie.filter(function (movie) {
    if (movie.genre.indexOf("Drama") >= 0) return true;
    return false;
  });
  return arrSpielDrama.length;
  // });
  // let nbMovieByspielberg = arrDrama.reduce(function (accu, movie) {
  //     if (movie.director === 'Steven Spielberg') {
  //         return accu++;
  //     } else {
  //         return accu;
  //     }
  // }, 0);
  // let arrDrama = arrMovies.filter(function (movie) {

  // let nbMovieByspielberg = arrDrama.reduce(function (accu, movie) {
  //     if (movie.director === 'Steven Spielberg') {
  //         return accu++;
  //     } else {
  //         return accu;
  //     }
  // }, 0);

  //   let arrByGenreAndDirectorName = arrMovies.filter(function (movie) {
  //     if (movie.director === nameDirector && ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  return arrByGenreAndDirectorName.length;
}
howManyMovies(movies, "Drama", "Steven Spielberg");
// Iteration 3: All rates average - Get the average of all rates with 2 decimals

// Iteration 4: Drama movies - Get the average of Drama Movies

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average
