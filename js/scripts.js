
// Loada inn header og footer með Ajax
$('#header').load('./header.html');
$('#footer').load('./footer.html');



var r = new XMLHttpRequest(); //hluti af javascript
r.open("GET", 'https://api.themoviedb.org/3/movie/550?api_key=b121c7cc62271f6902d3cd115457a166', true);
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

 const sliders = ['.popular-slider', '.comedy-slider', '.recent-slider']
 // Fyrir hvern streng (klasi) setjum við slick slider.
 sliders.forEach(slider => $(slider).slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  initialSlide: 1,
  centerMode: true,
  infinite:false
}))

;


