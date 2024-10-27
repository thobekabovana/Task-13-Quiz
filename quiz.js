const readline = require('readline');

// Quiz questions and answers
const questions = [
  { question: "What is the capital of France?", options: ['a) Paris', 'b) Berlin', 'c) Rome', 'd) Madrid'], answer: 'a' },
  { question: "What is 2 + 2?", options: ['a) 3', 'b) 4', 'c) 5', 'd) 6'], answer: 'b' },
  { question: "Which planet is known as the Red Planet?", options: ['a) Venus', 'b) Mars', 'c) Jupiter', 'd) Saturn'], answer: 'b' },
  // Add more questions as needed...
];

let score = 0;
let currentQuestion = 0;
let totalTime = 100; // Total quiz time in seconds

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask a question
const askQuestion = () => {
  if (currentQuestion >= questions.length) {
    endQuiz(); // End the quiz if all questions are answered
    return;
  }

  const q = questions[currentQuestion];
  console.log(`\nQuestion ${currentQuestion + 1}: ${q.question}`);
  q.options.forEach(option => console.log(option));

  let questionTime = 10; // Time for each question
  const questionInterval = setInterval(() => {
    questionTime--;
    console.log(`Time left for this question: ${questionTime} seconds`);
    if (questionTime <= 0) {
      clearInterval(questionInterval);
      console.log("\nTime's up for this question!\n");
      currentQuestion++;
      askQuestion(); // Move to the next question
    }
  }, 1000);

  rl.question("Your answer: ", (answer) => {
    clearInterval(questionInterval);
    if (answer.toLowerCase() === q.answer) {
      console.log("Correct!");
      score++;
    } else {
      console.log("Incorrect!");
    }
    currentQuestion++;
    askQuestion(); // Move to the next question
  });
};

// Function to handle quiz timer
const startQuizTimer = () => {
  const totalInterval = setInterval(() => {
    totalTime--;
    console.log(`Total time left: ${totalTime} seconds`);
    if (totalTime <= 0) {
      clearInterval(totalInterval);
      console.log("\nTime's up for the quiz!");
      endQuiz();
    }
  }, 1000);
};

// Function to end the quiz
const endQuiz = () => {
  console.log(`\nQuiz Over! Your final score is: ${score}/${questions.length}`);
  rl.close();
};

// Start the quiz
console.log("Welcome to the Quiz!");
startQuizTimer(); // Start the overall quiz timer
askQuestion(); // Start asking questions
