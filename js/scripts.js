
// ****Loada inn header og footer með Ajax
$('#header').load('./header.html');
$('#footer').load('./footer.html');


// **** API GÖGN

// 
const createSlide = (slide) => {
return `<div class="slide-container">
			<img class="img-responsive" src="${getImage(slide.poster_path)}"/>
			<div class="slide-overlay">
				<div class="slide-overlay-content">
					<div><a href="/about-page.html?id=${slide.id}">${slide.title}</a></div>
					<div>Felicity Jones | Diego Luna | Forest Whitaker</div>
					<div class="flex-bottom-align-apart">${getGenre(slide.genre_ids)} <div class="pull-right number-circle">${slide.vote_average}</div></div>
				</div>
			</div>
		</div>`;
}


const comedyMoviesPath = 'https://api.themoviedb.org/3/discover/movie?api_key=b121c7cc62271f6902d3cd115457a166&language=en-US&with_genres=35&sort_by=popularity.desc';
const popularMoviesPath = 'https://api.themoviedb.org/3/discover/movie?api_key=b121c7cc62271f6902d3cd115457a166&language=en-US&sort_by=popularity.desc';
const recentMoviesPath = 'https://api.themoviedb.org/3/discover/movie?api_key=b121c7cc62271f6902d3cd115457a166&language=en-US&sort_by=release_date.desc';
const genreListPath = 'https://api.themoviedb.org/3/genre/movie/list?api_key=b121c7cc62271f6902d3cd115457a166&language=en-US';
let genres;
/*
const getCrew = (movieId) => {

	return 'https://api.themoviedb.org/3/movie/'+movieId+'/credits?api_key=b121c7cc62271f6902d3cd115457a166';
}*/

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
// **** 1. Það sem við gerum fyrst *****
	
		// Sækjum lista af genres.
fetch(genreListPath, {
	method: 'get'
}).then(response =>
		// Svar yfir í json - gerir gögnin lesanleg sem json
	response.json()
		// Gögnin orðin data
	.then(data => {
		console.log(data);
		// Komin með listann og geymum hann í genres
		genres = data.genres
		// Sækjum gögnin fyrir alla sliderana í getSliders fallinu okkar hér fyrir neðan
		getSliders();
	})		
);

// ****** 2. Sækir slider gögn *****

const getSliders = () => {
	getSlider(popularMoviesPath, 'popular-slides', '.popular-slider');
	getSlider(recentMoviesPath, 'recent-slides', '.recent-slider');
	getSlider(comedyMoviesPath, 'comedy-slides', '.comedy-slider');
}

//  ****** 3. sækir bíómyndagögn fyrir slide-ra *****
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


 // *****Slider á forsíðu

const createSlider = (slider) => {
	// Fyrir hvern streng (klasi) setjum við slick slider.
	 $(slider).slick({
	 	arrows: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		dots: false,
		initialSlide: 1,
		centerMode: true,
		infinite:false,
		responsive: [

	{
	breakpoint: 480,
      settings: {
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		initialSlide: 1,
		centerMode: true,
		infinite:false
      }
    }
  ]
});
}






