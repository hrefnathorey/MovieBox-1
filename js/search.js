
// ****Loada inn header og footer með Ajax
$('#header').load('./header.html');
$('#footer').load('./footer.html');

// ****Filter-slider í search

var ratingSlider = document.getElementById('rating-slider');
var yearSlider = document.getElementById('year-slider');


const createSlider = (sliderElement, minRange, maxRange, step, start, decimals) => {
	noUiSlider.create(sliderElement, {
		start: start,
		connect: true,
		direction: 'ltr',
		tooltips: [ true, true ],
		range: {
			'min': minRange,
			'max': maxRange
		},
		step: step,
		pips: { // Show a scale with the slider
			mode: 'positions',
			values: [0, 100],
			density: 4
			
		},
		format: wNumb({
			decimals: decimals || 0
		})
	});
};

createSlider(ratingSlider, 0, 10, 0.1, [6, 8], 1);
createSlider(yearSlider, 1888, 2017, 1,[ 1950, 2000]);


//ratingSlider.noUiSlider.get();

//genre-buttons

$('.genre').on('click', function(){
    $('button').removeClass('selected');
    $(this).addClass('selected');
});

$('#search-button').on('click', () => {
	const query = $('#query').val(); 
	const yearQuery = { 
		gYear: yearSlider.noUiSlider.get()[0],
		lYear: yearSlider.noUiSlider.get()[1]
	}
	const ratingQuery = {
		gRating: ratingSlider.noUiSlider.get()[0],
		lRating: ratingSlider.noUiSlider.get()[1]
	}

	alert(yearSlider.noUiSlider.get()[0]);

	const startYear = '&release_date.gte=' + yearQuery.gYear;
	const endYear = '&release_date.lte=' + yearQuery.lYear;

	const leastRating = '&vote_average.gte=' + ratingQuery.gRating;
	const mostRating = '&vote_average.lte=' + ratingQuery.lRating;

	const apiPath = 'https://api.themoviedb.org/3/discover/movie?api_key=b121c7cc62271f6902d3cd115457a166&language=en-US&sort_by=popularity.desc'+ startYear + endYear;

	fetch(apiPath, {
		method: 'get'
	}).then(response =>
			// Svar yfir í json - gerir gögnin lesanleg sem json
		response.json()
			// Gögnin orðin data
		.then(data => {
			console.log(data);
			// Put the object into storage
			localStorage.setItem('rating', JSON.stringify(ratingQuery));
			localStorage.setItem('year', JSON.stringify(yearQuery));
			localStorage.setItem('results', JSON.stringify(data));
			window.location = '/results.html';
		})
	);

})




