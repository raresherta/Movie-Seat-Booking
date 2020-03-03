const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);

// Update total and count
function updateSelectedCount() {
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

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Movie select event
movieSelect.addEventListener('change', e => {
	ticketPrice = parseInt(e.target.value);
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

// Select a seat
container.addEventListener('click', e => {
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
});
