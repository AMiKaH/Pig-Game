/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
       // 1. Random Number
       var dice = Math.floor(Math.random() * 6) + 1;
       
       // 2. Display result
       var diceDOM = document.querySelector('.dice');
       diceDOM.style.display = 'block';
       diceDOM.src = 'dice-' + dice + '.png';
       
       // 3. Update roundScore only if rolled number is not a 1
			 if (dice === 6 && lastDice === 6) {
				 scores[activePlayer] = 0;
				 document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
				 nextPlayer();				 
			 } else if (dice != 1){
           //add score
           roundScore += dice;
           document.querySelector('#current-' + activePlayer).textContent = roundScore;
       } else {
           //next player
           nextPlayer();
   
       }
			lastDice = dice;
			
			}			
    

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
         // 1. add current score to global score
         scores[activePlayer] += roundScore;
         
         // 2. update the user interface
         document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
         // 3. check if player won the game
			   var input = document.querySelector('.final-score').value;
			   var winningScore;
			   
			   if (input) {
					 winningScore = input;
				 } else {
					 winningScore = 100;
				 }
         if (scores[activePlayer] >= winningScore) {
             document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
             document.querySelector('.dice').style.display = 'none';
             document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
             document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
             gamePlaying = false;      

         } else {
             nextPlayer();
         }
        
    }
    
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame(){
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
	

    
}

function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//var x = document.querySelector('#score-0').textContent;
//console.log(x);