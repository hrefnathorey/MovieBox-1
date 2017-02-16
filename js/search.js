
// ****Loada inn header og footer með Ajax
$('#header').load('./header.html');
$('#footer').load('./footer.html');

// ****Filter-slider í search

var ratingSlider = document.getElementById('rating-slider');
var yearSlider = document.getElementById('year-slider');


const createSlider = (sliderElement, minRange, maxRange, step) => {
	noUiSlider.create(sliderElement, {
		start: [6, 8],
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
		}
	});
};

createSlider(ratingSlider, 0, 10, 0.1);
createSlider(yearSlider, 1888, 2017, 1);


//ratingSlider.noUiSlider.get();
