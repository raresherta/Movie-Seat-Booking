const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = parseInt(movieSelect.value);

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update count and total
function updateSelectedCountAndTotal() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	// Selected seats returns a nodelist and we can't save the nodelist to the local storage
	// Copy selected seats into an array
	// Map through array
	// Return a new array of indexes
	const seatsIndex = [...selectedSeats].map(function(seat) {
		return [...seats].indexOf(seat);
	});

	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;

	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

// On refresh keep selected seats and movie(get data from local storage and populate UI)
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

// Select a movie
movieSelect.addEventListener('change', e => {
	ticketPrice = parseInt(e.target.value);
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCountAndTotal();
});

// Select a seat
container.addEventListener('click', e => {
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');
		updateSelectedCountAndTotal();
	}
});

// Initial count and total set
updateSelectedCountAndTotal();
