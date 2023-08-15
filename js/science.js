// Question, Optons and Answers

const quizData = [

  {
    question: `What is the smallest unit of matter?`,
    options: ["Atom", "Molecule","Cell", "Proton"],
    answer: "Atom",
  },

  {
    question: `Which planet in our solar system is known as the "Red Planet"?`,
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: `What is the process by which plants convert light energy into chemical energy to fuel their growth?`,
    options: ["Photosynthesis", "Respiration", "Fermentation", "Combustion"],
    answer: "Photosynthesis",
  },
  {
    question: `What is the chemical symbol for the element with the atomic number 6?`,
    options: ["N", "C", "O", "Fe"],
    answer: "C",
  },
  {
    question: `Which force is responsible for an object's weight on Earth?`,
    options: ["Gravitational force", "Electromagnetic force", "Strong nuclear force", "Weak nuclear force"],
    answer: "Gravitational force",
  },
  {
    question: `What is the process by which a liquid changes into a gas at its surface, below its boiling point?`,
    options: ["Vaporization", "Condensation", "Sublimation", "Evaporation"],
    answer: "Evaporation",
  },
  {
    question: `What is the densest naturally occurring element on Earth?`,
    options: ["Iron (Fe)", "Gold (Au)", "Lead (Pb)", "Uranium (U)"],
    answer: "Lead (Pb)",
  },
  {
    question: `Which type of electromagnetic radiation has the shortest wavelength?`,
    options: ["Radio waves", "Microwaves", "X-rays", "Gamma rays"],
    answer: "Gamma rays"
  },
  {
    question: `What is the name of the process by which an unstable atomic nucleus loses energy by emitting radiation?`,
    options: ["Fusion", "Fission", "Radioactivity", "Decay"],
    answer: "Radioactivity",
  },
  {
    question: `Which scientist formulated the three laws of motion and the law of universal gravitation?`,
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    answer: "Isaac Newton",
  }


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

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

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

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", ShowAnswer);

displayQuestion();
