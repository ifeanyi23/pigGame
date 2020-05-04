/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundscore, activePlayer, gamePlaying, previousDice1, previousDice2;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying) {
		var dice1 = Math.floor(Math.random()*6)+1;
		var dice2 = Math.floor(Math.random()*6)+1;

		var diceDOM1 = document.getElementById('dice-1');
		var diceDOM2 = document.getElementById('dice-2');
		diceDOM1.style.display = 'block';
		diceDOM2.style.display = 'block';
		diceDOM1.src = 'dice-' + dice1 + '.png';
		diceDOM2.src = 'dice-' + dice2 + '.png';

		if (dice1 !== 1 && dice2 !== 1) {
			if (dice1 === previousDice1 === dice2 === previousDice2 === 6) {
				score[activePlayer] = 0;
				previousDice1=0;
				previousDice2=0;
				document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
				nextPlayer();
			}  
			roundscore += (dice1 + dice2);
			document.getElementById('current-' + activePlayer).textContent = roundscore;
		} 
		else{
			nextPlayer()
		}	
		previousDice1 = dice1;
		previousDice2 = dice2;
	}

	
}); 

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {	
		//Add current score to Global score
		score[activePlayer] += roundscore;
		//Update Global score on screen
		document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
		//Check if Player won game

		var input = document.querySelector('.set-score').value

		input? input=input: input=100;

		if (score[activePlayer] >= input) {
			winner()
		}
		else {
			//Switch to next player
			nextPlayer()
		} 
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	gamePlaying	= true;
	score = [0,0];
	activePlayer = 0;
	roundscore = 0;
	document.getElementById('dice-1').style.display  = 'none';
	document.getElementById('dice-2').style.display  = 'none';
	document.getElementById('score-0').textContent = score[0];
	document.getElementById('score-1').textContent = score[1];
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById	('name-0').textContent = 'Player 1';
	document.getElementById	('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer() {
	//reset roundscore, update roundscore on screen, switch active player 
	//toggle player indicator and update dice DOM to show nothing
	roundscore =0
	document.getElementById('current-' + activePlayer).textContent = roundscore;
	activePlayer === 1? activePlayer=0  : activePlayer=1;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.getElementById('dice-1').style.display  = 'none';
	document.getElementById('dice-2').style.display  = 'none';
}

function winner() {
	document.getElementById	('name-' + activePlayer	).textContent = 'Winner!';
	document.getElementById('dice-1').style.display  = 'none';
	document.getElementById('dice-2').style.display  = 'none';
	document.querySelector('.player-' + activePlayer	+ '-panel').classList.add('winner');
	document.querySelector('.player-' + activePlayer	+ '-panel').classList.remove('active');
	gamePlaying	= false;
}