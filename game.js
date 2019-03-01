const question = document.getElementById('question');

const choices =Array.from(document.getElementsByClassName('choice-text'));
const loader = document.getElementById('loader');
const game = document.getElementById('game');

const progressBarFull = document.getElementById('progressBarFull')

const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');






let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//Questions array
let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
  .then(res => {
    return res.json()
  }).then(loadedQuestions => {
    questions = loadedQuestions.results.map(loadedQuestion =>{
      const formattedQuestion = {
        question: loadedQuestion.question
      };
      const answerChoices =[...loadedQuestion.incorrect_answers];
      console.log(answerChoices)

      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1
      answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);


      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index+1)] = choice;
        // console.log(formattedQuestion)
      })
      return formattedQuestion
    })
    
    startGame();
  }).catch(err => console.log(err))


//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;


//Function to kick-start the game
const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions)
  setInterval(() => {
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden")
  },20000)
}


//Function to get new questions
const getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
    localStorage.setItem('recentScore', score)
    return window.location.assign('/endgame.html')
  }
  questionCounter++;
  progressText.textContent = `Question:${questionCounter}/${MAX_QUESTIONS}`;

  //Updating the progress Bar

  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;



  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  question.textContent = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.textContent = currentQuestion[`choice${number}`]
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const applyClass = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (applyClass === 'correct'){
      incrementScore(CORRECT_BONUS)
    }

    selectedChoice.parentElement.classList.add(applyClass);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(applyClass);
      getNewQuestion();
    },1000)
  });
});


const incrementScore = num => {
  score+=num;
  scoreText.textContent = score;
}









