// Question, Optons and Answers

const quizData = [
 
  {
    question: `Which fruit is known as the "king of fruits" and has a strong, distinctive aroma?`,
    options: ["Banana", "Pineapple", "Durian", "Mango"],    
    answer: "Durian",
  },
  {
    question: `What is the main ingredient in guacamole, a popular Mexican dip?`,
    options: ["Tomato", "Onion", "Avocado", "Lemon"],
    answer: "Avocado",
  },
  {
    question: `Which Italian pasta is shaped like rice and is often used in soups?`,
    options: ["Fusilli", "Penne", "Orzo", "Linguine"],
    answer: "Orzo",
  },
  {
    question: `Which type of seafood is a delicacy often served as sushi or sashimi?`,
    options: ["Octopus", "Shrimp", "Salmon", "Eel"],
    answer: "Salmon",
  },
  {
    question: `What is the main ingredient in traditional Japanese miso soup?`,
    options: ["Seaweed", "Tofu", "Fish", "Miso paste"],
    answer: "Miso paste",
  },
  {
    question: `Which type of bread, originating in France, is characterized by its long, thin shape?`,
    options: ["Baguette", "Croissant", "Ciabatta", "Pretzel"],
    answer: "Baguette",
  },
  {
    question: `What type of nuts are used to make pesto sauce?`,
    options: ["Almonds", "Walnuts", "Cashews", "Pine nuts"],
    answer: "Pine nuts",
  },
  {
    question: `Which popular dessert consists of layers of sponge cake, custard, and fruit, often topped with whipped cream?`,
    options: ["Chocolate cake", "Apple pie", "Tiramisu", "Trifle"],
    answer: "Trifle",
  },
  {
    question: `What is the main ingredient in traditional hummus?`,
    options: ["Chickpeas", "Lentils", "Black beans", "Kidney beans"],
    answer: "Chickpeas",
  },
  {
    question: `Which type of cheese is known for its strong odor and creamy texture, often used in cooking?`,
    options: ["Cheddar", "Gouda", "Blue cheese", "Mozzarella"],
    answer: "Blue cheese",
  }
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