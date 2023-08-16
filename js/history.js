// Question, Optons and Answers

const quizData = [

  // {
  //   question: `What is the smallest unit of matter?`,
  //   options: ["Atom", "Molecule","Cell", "Proton"],
  //   answer: "Atom",
  // },

  {
    question: `Which ancient civilization built the Great Pyramids at Giza?`,
    options: ["Mesopotamia", "Ancient Greece", "Ancient Rome", "Ancient Egypt"],
    answer: "Ancient Egypt",
  },
  {
    question: `What event marked the beginning of World War I in 1914?`,
    options: ["Treaty of Versailles", "Battle of Stalingrad", "Assassination of Archduke Franz Ferdinand", "Signing of the Magna Carta"],
    answer: "Assassination of Archduke Franz Ferdinand",
  },
  {
    question: `Who was the first President of the United States?`,
    options: ["John Adams", "Thomas Jefferson", "George Washington", "Benjamin Franklin"],
    answer: "George Washington",    
  },
  {
    question: `The Renaissance was a cultural movement that originated in which European city?`,
    options: ["Rome", "Paris", "London", "Florence"],
    answer: "Florence",
  },
  {
    question: `What event led to the end of apartheid in South Africa?`,
    options: ["Cuban Missile Crisis", "Berlin Wall Fall", "Korean War", "Release of Nelson Mandela"],
    answer: "Release of Nelson Mandela",
  },
  {
    question: `Which famous speech begins with the line, "I have a dream"?`,
    options: [
      `Winston Churchill's "We shall fight on the beaches"`, 
      `Martin Luther King Jr.'s "I Have a Dream"`,
      `John F. Kennedy's "Ask not what your country can do for you"`,
      `Franklin D. Roosevelt's "The only thing we have to fear is fear itself"`
    ],
    answer: `Martin Luther King Jr.'s "I Have a Dream"`,
  },

  {
    question: `Who was the ruler of the Roman Empire when it reached its greatest territorial extent?`,
    options: ["Julius Caesar", "Nero", "Augustus", "Trajan"],
    answer: "Trajan",
  },

  {
    question: `Which famous ship sank in 1912 during its maiden voyage, leading to the deaths of more than 1,500 passengers?`,
    options: ["HMS Bounty", "RMS Lusitania", "RMS Titanic", "USS Maine"],
    answer: "RMS Titanic",
  },
  {
    question: `Which ancient civilization developed a complex writing system known as hieroglyphics?`,
    options: ["Mesopotamia", "Ancient Greece", "Ancient Rome", "Ancient Egypt"],
    answer: "Ancient Egypt",
  },
  {
    question: `What event marked the beginning of the French Revolution in 1789?`,
    opions: ["Storming of the Bastille", "Reign of Terror", "Execution of Marie Antoinette", "Signing of the Treaty of Versailles"],
    answer: "Storming of the Bastille",
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