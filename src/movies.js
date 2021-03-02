/////////// object structure of one element of movies array
// {
// "title": "The Shawshank Redemption",
// "year": 1994,
// "director": "Frank Darabont",
// "duration": "2h 22min",
// "genre": [
//   "Crime",
//   "Drama"
// ],
// "rate": 9.3
//   }
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?
/**
 *  return values of each element of movies by key, unique is flag, to have array with unique values set it to true (default false)
 * @param {object[]} movies
 * @param {string} key
 * @param {boolean} unique
 */
function getAllByKey(movies, key, unique = false) {
  let arrbyKey = movies.map(function (movie) {
    return movie[key];
  });
  if (unique) {
    return [...new Set(arrbyKey)];
  } else {
    return arrbyKey;
  }
}
/**
 * return all directors of movies
 * @param {object} movies
 * @param {boolean} unique set it to true to have array with unique values (default false)
 */
function getAllDirectors(movies, unique = false) {
  return getAllByKey([...movies], "director", unique);
}
getAllDirectors(movies);
getAllDirectors(movies, true);
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
/**
 * return number of Drama movies by Steven Spielberg in movies arr
 * @param {object[]} arrMovies
 */
function howManyMovies(arrMovies) {
  return arrMoviesByCriteria(arrMovies).length;
}
//// my bonus
/**
 * return filtered array by criteria
 * @param {object[]} arrMovies
 * @param {object} criteria  keys are criteria
 */
function arrMoviesByCriteria(
  arrMovies,
  criteria = { director: "Steven Spielberg", genre: "Drama" }
) {
  // console.log(criteria);
  let filteredArr = [...arrMovies];
  // on va filtrer en boucle sur chaque critére
  for (const criterion in criteria) {
    // on verifie si le type du critére et un array et applique le bon process en conséquence
    if (criterion === "genre") {
      filteredArr = filteredArr.filter(function (movie) {
        if (movie.genre.indexOf(criteria[criterion]) >= 0) return true;
        return false;
      });
    } else {
      filteredArr = filteredArr.filter(function (movie) {
        if (movie.director === criteria[criterion]) return true;
        return false;
      });
    }
  }
  return filteredArr;
}
howManyMovies(movies);
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// Iteration 3: All rates average - Get the average of all rates with 2 decimals
/**
 * return average of all rates in a array of movies
 * @param {object[]} arrMovies
 */
function ratesAverage(arrMovies) {
  let divisor = arrMovies.length;
  if (divisor === 0) return 0;
  let avg =
    arrMovies.reduce(function (acc, movie) {
      if (movie.rate) {
        return acc + movie.rate;
      } else {
        return acc;
      }
    }, 0) / divisor;
  return Number(avg.toFixed(2));
}
// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesRate(arrMovies) {
  let arrDrama = arrMovies.filter(function (movie) {
    if (movie.genre.indexOf("Drama") >= 0) return true;
    return false;
  });
  return ratesAverage(arrDrama);
}
// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(arrMovies) {
  let arrCopy = [...arrMovies];
  let arrOrderByYear = arrCopy.sort(function (a, b) {
    //return a.year - b.year;
    if (a.year < b.year) return -1;
    if (a.year > b.year) return 1;
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
  });
  return arrOrderByYear;
}
// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(arrMovies) {
  let arrCopy = [...arrMovies];
  let arrOrderByOrderedTitle = arrCopy.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });
  let i = 0;
  let ret = [];
  if (arrOrderByOrderedTitle.length < 21) {
    while (i < arrOrderByOrderedTitle.length) {
      ret.push(arrOrderByOrderedTitle[i].title);
      i++;
    }
  } else {
    while (i < 20) {
      ret.push(arrOrderByOrderedTitle[i].title);
      i++;
    }
  }
  return ret;
}
// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(arrMovies) {
  let arrCopyWithDurationNumber = arrMovies.map((movie) => ({
    ...movie,
    duration: literalHourToNumberMinutes(movie.duration),
  }));
  return arrCopyWithDurationNumber;
}
function literalHourToNumberMinutes(strHour) {
  let reg = /(?<nbHour>\d+)h\s(?<nbMin>\d+)min|(?<nbHourOnly>\d+)h|(?<nbMinOnly>\d+)min/gi;
  let resultReg = reg.exec(strHour).groups;
  if (resultReg.nbHourOnly) {
    return Number(resultReg.nbHourOnly) * 60;
  } else if (resultReg.nbMinOnly) {
    return Number(resultReg.nbMinOnly);
  } else {
    return Number(resultReg.nbHour) * 60 + Number(resultReg.nbMin);
  }
}
// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

function bestYearAvg(arrMovies) {
  if (arrMovies.length === 0) return null;
  let avgRateByYear = arrMovies.reduce(function (accu, val) {
    let indexYearInAccu = accu.findIndex((el) => el.year === val.year, this);
    if (indexYearInAccu >= 0) {
      accu[indexYearInAccu].rate = (accu[indexYearInAccu].rate + val.rate) / 2;
      return accu;
    } else {
      let newYear = { year: val.year, rate: val.rate };
      accu.push(newYear);
      return accu;
    }
  }, []);
  avgRateByYear.sort(function (a, b) {
    if (a.rate < b.rate) return 1;
    if (a.rate > b.rate) return -1;
    if (a.rate === b.rate) {
      return a.year - b.year;
    }
  });
  return `The best year was ${avgRateByYear[0].year} with an average rate of ${Number(
    avgRateByYear[0].rate.toFixed(1)
  )}`;
}

//////////////// Utils
/**
 * return the sum of all number in array of number, if no number in array return 0
 *
 * @param {number[]} arrayOfNumber
 * @returns {number} sum or zero
 */
function sumNumbers(arrayOfNumber) {
  if (arrayOfNumber.length === 0) {
    return 0;
  }
  let sum = 0;
  for (const number of arrayOfNumber) {
    sum += number;
  }
  return sum;
}
/**
 * return the average of array number
 *
 * @param {number[]} arrayOfNumber
 * @returns {?number}
 */
function averageNumbers(arrayOfNumber) {
  if (arrayOfNumber.length === 0) {
    return null;
  }
  return sumNumbers(arrayOfNumber) / arrayOfNumber.length;
}
