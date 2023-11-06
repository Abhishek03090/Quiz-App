const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "F. Scott Fitzgerald"],
        answer: "William Shakespeare"
    },
    // Add more questions here
];

let currentQuestion = 0;
let score = 0;
let quizCompleted = false;

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Add your authentication logic here (e.g., check credentials)
    if (username && password) {
        document.querySelector(".login-container").style.display = "none";
        document.querySelector(".quiz-container").style.display = "block";
        displayQuestion(currentQuestion);
    }
}

function displayQuestion(index) {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const questionData = questions[index];

    if (questionData) {
        questionElement.textContent = `Question ${index + 1}: ${questionData.question}`;
        optionsElement.innerHTML = "";

        questionData.options.forEach((option, optionIndex) => {
            const radioBtn = document.createElement("input");
            radioBtn.type = "radio";
            radioBtn.name = "answer";
            radioBtn.value = String.fromCharCode(65 + optionIndex); // A, B, C, ...

            const label = document.createElement("label");
            label.appendChild(radioBtn);
            label.appendChild(document.createTextNode(` Option ${String.fromCharCode(65 + optionIndex)}: ${option}`));

            optionsElement.appendChild(label);
        });
    } else {
        // No more questions, display the result message and "Finish" button
        displayResult();
    }
}

function nextQuestion() {
    if (quizCompleted) {
        alert("You have already completed the quiz. Click 'Finish' to exit.");
        return;
    }

    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        if (questions[currentQuestion].answer === selectedOption.value) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {
            displayQuestion(currentQuestion);
        } else {
            displayResult();
        }
    } else {
        alert("Please select an option.");
    }
}

function displayResult() {
    const resultElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    if (score === questions.length) {
        resultElement.textContent = `Congratulations! You scored ${score}/${questions.length}!`;
    } else {
        resultElement.textContent = `Better luck next time. You scored ${score}/${questions.length}.`;
    }

    optionsElement.innerHTML = "";
    quizCompleted = true;
    document.getElementById("nextBtn").textContent = "Finish";

    // Display a message within the quiz container
    const quizContainer = document.querySelector(".quiz-container");
    const completionMessage = document.createElement("p");
    completionMessage.textContent = "You have completed the quiz.";
    quizContainer.appendChild(completionMessage);
}

// Initial display of the first question
displayQuestion(currentQuestion);
// ... (previous code)

function displayResult() {
    const resultElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    if (score === questions.length) {
        resultElement.textContent = `Congratulations! You scored ${score}/${questions.length}!`;
    } else {
        resultElement.textContent = `Better luck next time. You scored ${score}/${questions.length}.`;
    }

    optionsElement.innerHTML = "";
    quizCompleted = true;

    // Replace the "Next" button with the "Finish" button
    const nextButton = document.getElementById("nextBtn");
    nextButton.textContent = "Finish";
    nextButton.onclick = logout;

    // Display a message within the quiz container
    const quizContainer = document.querySelector(".quiz-container");
    const completionMessage = document.createElement("p");
    completionMessage.textContent = "You have completed the quiz.";
    quizContainer.appendChild(completionMessage);
}

function logout() {
    // Redirect the user to the login page
    window.location.href = "quiz.html";
}

// ... (rest of the code)
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Add your authentication logic here (e.g., check credentials)
    if (username && password) {
        // Hide the login section
        document.getElementById("loginContainer").style.display = "none";

        // Show the quiz section
        document.getElementById("quizContainer").style.display = "block";

        // Start displaying the questions
        displayQuestion(currentQuestion);
    }
}
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quizAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

// Define a schema and model for "users" and "quizzes" collections, and perform CRUD operations as needed.





