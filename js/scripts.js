
// Loada inn header og footer með Ajax
$('#header').load('./header.html');
$('#footer').load('./footer.html');

// Api gögn

const createSlide = (slide) => {
return `<div class="slide-container">
			<img class="img-responsive" src="${getImage(slide.poster_path)}"/>
			<div class="slide-overlay">
				<div class="slide-overlay-content">
					<div>${slide.title}</div>
					<div>Felicity Jones | Diego Luna | Forest Whitaker</div>
					<div class="flex-bottom-align-apart">${getGenre(slide.genre_ids)} <div class="pull-right number-circle">${slide.vote_average}</div></div>
				</div>
			</div>
		</div>`;
}



const popularMoviesPath = 'https://api.themoviedb.org/3/discover/movie?api_key=b121c7cc62271f6902d3cd115457a166&language=en-US&sort_by=popularity.desc';
const recentMoviesPath = 'https://api.themoviedb.org/3/discover/movie?api_key=b121c7cc62271f6902d3cd115457a166&language=en-US&sort_by=release_date.desc';
const genreListPath = 'https://api.themoviedb.org/3/genre/movie/list?api_key=b121c7cc62271f6902d3cd115457a166&language=en-US';
let genres;

const getCrew = (movieId) => {

	return 'https://api.themoviedb.org/3/movie/'+movieId+'/credits?api_key=b121c7cc62271f6902d3cd115457a166';
}

const getImage = (poster_path) => {
	if (poster_path){
		return 'https://image.tmdb.org/t/p/w500' + poster_path; 
	}
	else {
		return '/img/paulR_.png';
	}
}

const getGenre = (genreNumbers) => {
	//return genres.filter(genre => genre.id === genreNumber)[0].name
	let returnGenres = '';

	genreNumbers.forEach(id => {
		returnGenres += genres.filter(genre => genre.id === id)[0].name;
		returnGenres += ', ';
	})
	return returnGenres.slice(0,-2);
}

fetch(genreListPath, {
	method: 'get'
}).then(response =>
	response.json()
	.then(data => {
		console.log(data);
		genres = data.genres
		getSliders();
	})		
);

const getSliders = () => {
	getSlider(popularMoviesPath,'popular-slides','.popular-slider');
	getSlider(recentMoviesPath, 'recent-slides','.recent-slider');

	// getRecentSliders
	// ..
}

const getSlider = (path, sliderId, sliderClass) => {
	// url (required), options (optional)
	fetch(path, {
		method: 'get'
	}).then(response =>
		response.json()
	        .then(data => {
	                // hér er ég að logga út gögnin
	                console.log(data)
	                let myndaHTML = '';
	                data.results.forEach(mynd => myndaHTML += createSlide(mynd));
	                document.getElementById(sliderId).innerHTML = myndaHTML;
	                createSlider(sliderClass);
	              }
	        )
	).catch(err => console.log("error"+ err));
}

var r = new XMLHttpRequest(); //hluti af javascript
r.open("GET", 'https://api.themoviedb.org/3/movie/550/credits?api_key=b121c7cc62271f6902d3cd115457a166', true);
r.onreadystatechange = function () {
  if (r.readyState != 4 || r.status != 200) return;
//  alert("Success: " + r.responseText);
	const response = JSON.parse(r.responseText);
	// const container = document.createElement("div");
	// const image = document.createElement("img");
	// const title = document.createElement("h1");
	// //image.src = "http://image.tmdb.org/t/p/original" + response.backdrop_path;
	// title.innerHTML = response.original_title;
	// //container.append(image);
	// container.append(title);
	document.getElementById("test").innerHTML=`
	<div>${response.original_title}</div>
	<div>Felicity Jones | Diego Luna | Forest Whitaker</div>
	<div class="flex-bottom-align-apart">Action, Adventure, Sci-Fi <div class="pull-right number-circle">8.1</div></div>
	`;
	console.log(response);
};
r.send();




 // Slider á forsíðu


const createSlider = (slider) => {
	// Fyrir hvern streng (klasi) setjum við slick slider.
	 $(slider).slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		initialSlide: 1,
		centerMode: true,
		infinite:false
	});
}



const sliders = ['.comedy-slider']
sliders.forEach(slider => createSlider(slider));

