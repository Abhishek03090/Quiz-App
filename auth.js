// app.js

// Function to handle user registration
function signUp() {
    const newUsername = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorMessage = document.getElementById("error-message");

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    // Check if the username is unique (in a real application, you'd use a server-side check)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.some((user) => user.username === newUsername);

    if (userExists) {
        errorMessage.textContent = "Username already exists. Please choose a different one.";
        return;
    }

    // Store the new user data in local storage (in a real application, use a secure backend)
    storedUsers.push({ username: newUsername, password: newPassword });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Redirect to the sign-in page (you can customize this URL)
    window.location.href = "quiz.html";
}

// Add event listener to the sign-up button
document.getElementById("submit-button").addEventListener("click", signUp);

const mongoose = require('mongoose');

// Create a connection to the MongoDB database
mongoose.connect('mongodb://localhost/quizAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

// Define a Mongoose schema and model for user credentials
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Function to check if a user exists in the database
function findUser(username, password, callback) {
    User.findOne({ username, password }, (err, user) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            callback(null, user);
        }
    });
}

// Example usage for user authentication
findUser('exampleUser', 'examplePassword', (err, user) => {
    if (err) {
        console.error('Error:', err);
    } else {
        if (user) {
            console.log('User found:', user);
        } else {
            console.log('User not found');
        }
    }
});

