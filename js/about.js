
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
const getParameterByName = (name, url)  => {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const movieId = getParameterByName('id');

if(movieId){
	console.log(movieId);

	const moviePath = 'https://api.themoviedb.org/3/movie/'+ movieId +'?api_key=b121c7cc62271f6902d3cd115457a166&language=en-US&append_to_response=videos,images,credits';

	fetch(moviePath, {
		method: 'get'
	}).then(response =>
			// Svar yfir í json - gerir gögnin lesanleg sem json
		response.json()
			// Gögnin orðin data
		.then(data => {
			console.log(data);
			insertData(data);
		})
	);
}

const insertData = (data) => {
	document.getElementById('title').innerHTML = data.title;
	document.getElementById('year').innerHTML = data.release_date.substring(0,4);
	document.getElementById('duration').innerHTML = data.runtime + ' min';
	document.getElementById('poster').src = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
	document.getElementsByClassName('about-header')[0].style['background-image'] = ' url(https://image.tmdb.org/t/p/w1000' + data.backdrop_path + ')';
	document.getElementById('genres').innerHTML = joinGenres(data.genres);
	document.getElementById('writers').innerHTML = joinWriters(data.credits.crew);
	document.getElementById('directors').innerHTML = joinDirectors(data.credits.crew);
	document.getElementById('overview').innerHTML = data.overview;

}


const joinGenres = (genres) => {
	let genresString = '';

	genres.forEach(genre => genresString += genre.name + ', ');

	return genresString.slice(0,-2);
}

const joinWriters = (crew) => {
	let writerString = '';

	crew.forEach(member => {
		if(member.job === 'Writer') {
			writerString += member.name + ', ';
		}
	});

	return writerString.slice(0,-2);
}

const joinDirectors = (crew) => {
	let directorString = '';

	crew.forEach(member => {
		if(member.job === 'Director') {
			directorString += member.name + ', ';
		}
	});

	return directorString.slice(0,-2);
}
