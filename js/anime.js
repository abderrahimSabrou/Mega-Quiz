// Question, Optons and Answers

const quizData = [
  {
    question: `In the anime "One Piece," what is the name of Monkey D. Luffy's signature attack?`,
    options: [
      "Demon Wind Shuriken",
      "Kamehameha",
      "Gum-Gum Pistol",
      "Rasengan",
    ],
    answer: "Gum-Gum Pistol",
  },
  {
    question: `In the anime "Dragon Ball Z," what transformation allows Goku to achieve a state of power beyond Super Saiyan?`,
    options: ["Ultra Instinct", "Bankai", "Hollowfication", "Sage Mode"],
    answer: "Ultra Instinct",
  },
  {
    question: `In the anime "Naruto," what is the primary jutsu that Naruto Uzumaki is known for?`,
    options: ["Rasengan", "Chidori", "Kamehameha", "Bankai"],
    answer: "Rasengan",
  },
  {
    question: `Which anime features a group of young sorcerers known as the "Fairy Tail" guild?`,
    options: ["Bleach", "Fairy Tail", "One Punch Man", "Naruto"],
    answer: "Fairy Tail",
  },
  {
    question: `In "One Piece," what is the name of Luffy's ship?`,
    options: [
      "The Black Pearl",
      "Thousand Sunny",
      "The Flying Dutchman",
      "Going Merry",
    ],
    answer: "Thousand Sunny",
  },

  {
    question: `What's the main goal of the characters in "Fullmetal Alchemist"?`,
    options: [
      "To find the Holy Grail",
      "To become the strongest warriors",
      "To become the best alchemists",
      "To restore their bodies using the Philosopher's Stone",
    ],
    answer: "To restore their bodies using the Philosopher's Stone",
  },

  {
    question: ` In "Sword Art Online," what's the consequence of dying in the virtual world?`,
    options: [
      "Players respawn at the beginning",
      "Players lose all their items",
      "Players become NPCs",
      "Players die in real life",
    ],
    answer: "Players die in real life",
  },

  {
    question: `In "Demon Slayer," what's the name of the organization that Tanjiro joins to fight demons?`,
    options: [
      "Demon Corps",
      " Demon Slaying Guild",
      "Demon Exterminators",
      " Demon Slayer Corps",
    ],
    answer: "Demon Slayer Corps",
  },

  {
    question: `What's the name of the mythical treasure that the characters in "Fairy Tail" seek?`,
    options: [
      "The Golden Crown",
      "The Silver Scroll",
      "The Celestial Jewel",
      "The One Piece",
    ],
    answer: "The One Piece",
  },

  {
    question: `Which anime features a world where humans are ranked based on their psychic powers?`,
    options: [
      "Mob Psycho 100",
      "Psychic Sensation",
      "Mind Force",
      "Telepathic Warriors",
    ],
    answer: "Mob Psycho 100",
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
