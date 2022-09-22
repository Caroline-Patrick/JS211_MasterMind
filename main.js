'use strict';

let colors = require('colors');
const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
    let solutionArray = solution.split(''); // 'abcd' to ['a', 'b', 'c', 'd']
    let guessArray = guess.split(''); // 'feih' to ['f', 'e', 'i', 'h']
    let correctLetterLocations = 0;
    let correctLetters = 0;
    let hint

    for (let i = 0; i < solutionArray.length; i++) {
  
        if(solutionArray[i] === guessArray[i]) {
           correctLetterLocations++; // could also be written correctLetterLocations = correctLetterLocations + 1
           solutionArray[i] = null
        }
        }

    for (let j = 0; j < guessArray.length; j++) {
        if(solutionArray.indexOf(guessArray[j])!=-1){
            correctLetters++
      }
    }  
    
    hint = `||${guess} || Hint: You have ${colors.red(correctLetterLocations, 'correct letter(s) in the correct location(s)')} - You have ${colors.yellow(correctLetters, 'letter(s) that are correct, but in the wrong spot')}`

    board.push(hint)
    // console.log(board)

    if(board.length>10) {
      console.log("Sorry, you don't have any more guesses left")
      console.log(`The correct answer was: ${solution}`)
      board = [];
      generateSolution()
    }
}


const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  
  if(guess === solution) 
    { console.log( "You guessed it!")}

  else {
    generateHint(guess)
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}