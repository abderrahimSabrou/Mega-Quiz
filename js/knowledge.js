// Question, Optons and Answers

const quizData = [
  {
    question: `What is the capital city of Japan?`,
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    answer: "Tokyo",
  },
  {
    question: "Which gas do plants primarily use for photosynthesis?",
    options: ["Nitrogen", "Carbon Dioxide", "Oxygen", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    answer: "Albert Einstein",
  },
  {
    question: "What is the largest mammal on Earth?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    answer: "Blue Whale",
  },
  {
    question:
      "Which novel by George Orwell is a dystopian portrayal of a totalitarian state?",
    options: ["Brave New World", "1984", "Fahrenheit 451", "Animal Farm"],
    answer: "1984",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Gd", "Au", "Go", "Ag"],
    answer: "Au",
  },
  {
    question: "In which year did the Titanic sink after hitting an iceberg?",
    options: ["1912", "1920", "1907", "1931"],
    answer: "1912",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["ndian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the world's longest river?",
    options: ["Nile", "Amazon", "Mississippi", "Yangtze"],
    answer: "Nile",
  },
];

// Select Element from Game.HTML File
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
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

// Restart the Quiz game
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
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
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
    <p>
      <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
      <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswers}<br>
      <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}<br>
    </p>
    `;
  }

  resultContainer.innerHTML = `
  <p>Your Scored ${score} out of ${quizData.length}!</p>
  <p>Incorrect Answers:</p>
  ${incorrectAnswersHtml}
  `;
}

// Call the Functions buttons
submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", ShowAnswer);

// Display Questions
displayQuestion();