
// ****Loada inn header og footer með Ajax
$('#header').load('./header.html');
$('#footer').load('./footer.html');



// Retrieve the object from storage
const rating = JSON.parse(localStorage.getItem('rating'));
const year = JSON.parse(localStorage.getItem('year'));
const results = JSON.parse(localStorage.getItem('results'));



console.log('rating: ', rating);
console.log('year: ', year);
console.log('results: ', results);