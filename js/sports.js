// Question, Optons and Answers

const quizData = [
 
  { 
    question: `Which sport is known as "the beautiful game"?`,
    options: ["Basketball", "Soccer (Football)", "Baseball", "Tennis"],
    answer: "Soccer (Football)",
  },

  {
    question: `Which golfer is often referred to as "The Golden Bear"?`,
    options: ["Tiger Woods", "Phil Mickelson", "Jack Nicklaus", "Arnold Palmer"],
    answer: "Jack Nicklaus",
  },
  {
    question: `In which sport would you perform a slam dunk?`,
    options: ["Volleyball", "Basketball", "Soccer", "Cricket"],
    answer: "Basketball",    
  },
  {
    question: `Which country is famous for introducing the sport of sumo wrestling?`,
    options: ["China", "Russia", "Japan", "Mongolia"],
    answer: "Japan",
  },
  {
    question: `Which track and field event involves a combination of running, jumping, and throwing?`,
    options: ["Shot put", " Long jump", "Decathlon", "100m sprint"],
    answer: "Decathlon",
  },
  {
    question: `Which city hosted the 2016 Summer Olympics?`,
    options: ["Beijing", "Rio de Janeiro", "London", "Tokyo"],
    answer: "Rio de Janeiro",
  },
  {
    question: `In American football, how many points is a touchdown worth?`,
    options: ["3 points", "5 points", "6 points", "7 points"],
    answer: "6 points",
  },
  {
    question: `Which tennis player has won the most Grand Slam titles in the men's singles category?`,
    options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
    answer: "Novak Djokovic",    
  },
  {
    question: `Which sport uses terms like "birdie" and "eagle" to denote scoring?`, 
    options: ["Golf", "Rugby", "Swimming", "Table tennis"],
    answer: "Golf",
  },
  {
    question: `Which sport features a heavyweight category known as "sumo"?`,
    options: ["Boxing", "Wrestling", "Judo", "Karate"],
    answer: "Wrestling",
  },
];

// Select Element from Game.HTML File
const gameContainer = document.querySelector('game-container'); 

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("ShowAnswer");

//  initialized to keep track of the current question being displayed and the player's score
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// Generate random order question time the user start/restart the Quiz
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Display Questions
function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  // Everytime the user restar the game or refresh the page 
  // => Shuffle the order of the options
  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    // radio.style.margin = "10px";
    // radio.style.display = "inline-block";
    radio.value = shuffledOptions[i];

    const optiontext = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optiontext);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}


// Check if the Answer is right
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswers: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checkAnswer = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}


// After ending the quiz, display the result
function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  retryButton.style.margin = "auto 80px";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `<p class="display__result">You scored ${score} out of ${quizData.length}</p>`;
}

// Restart the Quiz game
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "block";
  submitButton.style.margin = "5px auto";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

// After ending the quiz
// ==> you can see the correct and incorrect answers
function ShowAnswer() {


  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "block";
  retryButton.style.margin = "5px auto";  
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
    <p class ="answers">
      <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
      <strong class="red">Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswers}.<br>
      <strong class="green">Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}<br>
    </p>
    `;
  }

  resultContainer.innerHTML = `
  <p class="end__score">Your Scored ${score} out of ${quizData.length}!</p>
  <p class="end__correct">Incorrect Answers:</p>
  ${incorrectAnswersHtml}
  `;
}

// Call the Functions buttons
submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", ShowAnswer);

// Display Questions
displayQuestion();