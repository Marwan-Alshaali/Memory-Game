const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score=0;

function flipCard(){
	if(lockBoard) return;
	if(this == firstCard) return;

	this.classList.add('flip');

	if(!hasFlippedCard){
		//First Click
		hasFlippedCard = true;
		firstCard = this;
	}
	else{
		//Second Click
		hasFlippedCard = false;
		secondCard = this;

		checkForMatch();
	}
}

function checkForMatch(){
	//do cards match?
	let isMatch = firstCard.dataset.name == secondCard.dataset.name;
	
	//			true				false
	isMatch ? disableCards() : unflipCards();
}

function disableCards(){
	score++;
	firstCard.removeEventListener('click', flipCard)
	secondCard.removeEventListener('click', flipCard)
	resetBoard();
	if(score == 6){
		setTimeout(()=>{
			alert("You win!");
		}, 200);
	}
}

function unflipCards(){
	lockBoard = true;
	setTimeout(()=>{
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');

			resetBoard();
			}, 1000);
}

function resetBoard(){
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle(){
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random()*12);
		card.style.order = randomPos;
	});
})();

cards.forEach(card => card.addEventListener('click', flipCard));