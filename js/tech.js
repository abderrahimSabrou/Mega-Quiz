// Question, Optons and Answers

const quizData = [
 

  {
    question: `Which company developed the first successful personal computer, known as the Altair 8800, in 1975?`,
    options: ["Microsoft", "IBM", "Apple", "Intel"],
    answer: "Intel",
  },

  {
    question: `What is the term for a set of instructions given to a computer to perform a specific task?`,
    options: ["Algorithm", "Code", "Data", "Program"],
    answer: "Program",
  },

  {
    question: `What technology allows a user to interact with a computer using gestures, touch, and multi-touch gestures?`,
    options: [`Virtual reality (VR)`, `Augmented reality (AR)`, "Gesture recognition", "Voice recognition"],
    answer: "Gesture recognition",
  },

  {
    question: `Which programming language is often used for developing mobile applications for both iOS and Android platforms?`,
    options: ["Java", "Python", "C++", "Swift"],
    answer: "Swift",
  },

  {
    question: `Which technology allows computers to store and retrieve data using magnetic fields on a spinning disk?`,
    options: [`SSD (Solid-State Drive)`, `HDD (Hard Disk Drive)`, `USB (Universal Serial Bus)`, `RAM (Random Access Memory)`],
    answer: `HDD (Hard Disk Drive)`,
  },

  {
    question: `What technology is commonly used to encrypt data transmissions and provide secure communication over the internet?`,
    options: [`HTTP (Hypertext Transfer Protocol)`, `HTML (Hypertext Markup Language)`, `SSL/TLS (Secure Sockets Layer/Transport Layer Security)`, `FTP (File Transfer Protocol)`],
    answer: `SSL/TLS (Secure Sockets Layer/Transport Layer Security)`,
  },

  {
    question: `What technology is the basis for blockchain and cryptocurrencies like Bitcoin?`,
    options: [`Artificial intelligence (AI)`, "Quantum computing", "Decentralized ledger", "Cloud computing"],
    answer: "Decentralized ledger",
  },

  {
    question: `What is the name of the programming paradigm that involves breaking down a problem into smaller, reusable parts?`,
    options: ["Object-oriented programming", "Functional programming", "Procedural programming", "Modular programming"],
    answer: "Modular programming",
  },

  {
    question: `Which technology protocol is used to assign IP addresses to devices on a network dynamically?`,
    options: [`DNS (Domain Name System)`, `DHCP (Dynamic Host Configuration Protocol)`, `FTP (File Transfer Protocol)`, `SMTP (Simple Mail Transfer Protocol)`],
    answer: `DHCP (Dynamic Host Configuration Protocol)`,
  },

  {
    question: `Which type of encryption uses a single key for both encryption and decryption?`,
    options: ["Symmetric encryption", "Asymmetric encryption", "Hashing", "Public-key encryption"],
    answer: "Symmetric encryption",
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