
// ****Loada inn header og footer með Ajax
$('#header').load('./header.html');
$('#footer').load('./footer.html');

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

class movieSource {
	constructor(url) {
    	this._url = url;
  	}

  	get url() {
  		return this._url;
  	}

  	set url(url) {
  		this._url = url;
  	}
}

const movieId = getParameterByName('id');

if(movieId){
	const ms = new movieSource('https://api.themoviedb.org/3/movie/'+ movieId +'?api_key=b121c7cc62271f6902d3cd115457a166&language=en-US&include_image_language=en,null&append_to_response=videos,images,credits');

	fetch(ms.url, {
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
	const dataH = new dataHandler();
	document.getElementById('title').innerHTML = data.title;
	document.getElementById('year').innerHTML = data.release_date.substring(0,4);
	document.getElementById('duration').innerHTML = data.runtime + ' min';
	document.getElementById('poster').src = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
	document.getElementsByClassName('about-header')[0].style['background-image'] = ' url(https://image.tmdb.org/t/p/w1000' + data.backdrop_path + ')';
	document.getElementById('genres').innerHTML = dataH.joinGenres(data.genres);
	document.getElementById('writers').innerHTML = dataH.joinWriters(data.credits.crew);
	document.getElementById('directors').innerHTML = dataH.joinDirectors(data.credits.crew);
	document.getElementById('overview').innerHTML = data.overview;
	document.getElementById('actors').innerHTML = dataH.createActors(data.credits.cast);
}

class dataHandler{

	joinGenres(genres) {
		let genresString = '';

		genres.forEach(genre => genresString += genre.name + ', ');

		return genresString.slice(0,-2);
	}

	joinWriters(crew) {
		let writerString = '';

		crew.forEach(member => {
			if(member.job === 'Writer') {
				writerString += member.name + ', ';
			}
		});

		return writerString.slice(0,-2);
	}

	joinDirectors(crew) {
		let directorString = '';

		crew.forEach(member => {
			if(member.job === 'Director') {
				directorString += member.name + ', ';
			}
		});

		return directorString.slice(0,-2);
	}

	createActors(actors) {
		let actorsString= '';
		
		for(let i = 0; i < 5 ; i++) {
			actorsString += this.createActor(actors[i]);
		}

		return actorsString;
	};

	createActor(actor){
		return `<div class="col-lg-2 cast-images">
					<img src="https://image.tmdb.org/t/p/w500${actor.profile_path}">
					<figcaption>${actor.name}</figcaption>
				</div>`;
	}
}
