const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result');

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    { question: 'What is the capital of France?', answers: [{ text: 'Paris', correct: true }, { text: 'London', correct: false }, { text: 'Berlin', correct: false }, { text: 'Rome', correct: false }] },
    { question: 'Which continent is the Sahara Desert located in?', answers: [{ text: 'Africa', correct: true }, { text: 'Asia', correct: false }, { text: 'Australia', correct: false }, { text: 'Europe', correct: false }] },
    { question: 'What is the longest river in the world?', answers: [{ text: 'Nile', correct: true }, { text: 'Amazon', correct: false }, { text: 'Yangtze', correct: false }, { text: 'Mississippi', correct: false }] },
    { question: 'Which country has the largest population?', answers: [{ text: 'China', correct: true }, { text: 'India', correct: false }, { text: 'USA', correct: false }, { text: 'Indonesia', correct: false }] },
    { question: 'What is the capital of Japan?', answers: [{ text: 'Tokyo', correct: true }, { text: 'Kyoto', correct: false }, { text: 'Osaka', correct: false }, { text: 'Nagoya', correct: false }] },
    { question: 'Which ocean is the largest?', answers: [{ text: 'Pacific', correct: true }, { text: 'Atlantic', correct: false }, { text: 'Indian', correct: false }, { text: 'Southern', correct: false }] },
    { question: 'Which country is both in Europe and Asia?', answers: [{ text: 'Russia', correct: true }, { text: 'Egypt', correct: false }, { text: 'Turkey', correct: false }, { text: 'Kazakhstan', correct: false }] },
    { question: 'What is the smallest country in the world?', answers: [{ text: 'Vatican City', correct: true }, { text: 'Monaco', correct: false }, { text: 'Nauru', correct: false }, { text: 'San Marino', correct: false }] },
    { question: 'Which mountain is the tallest in the world?', answers: [{ text: 'Mount Everest', correct: true }, { text: 'K2', correct: false }, { text: 'Mount Kilimanjaro', correct: false }, { text: 'Mount Elbrus', correct: false }] },
    { question: 'Which continent has the most countries?', answers: [{ text: 'Africa', correct: true }, { text: 'Europe', correct: false }, { text: 'Asia', correct: false }, { text: 'North America', correct: false }] },
    

];

// Event listeners for start and next buttons
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

// Function to start the game
function startGame() {
    startButton.classList.add('hide');
    // Randomly shuffle questions and select 10 random ones
    shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    resultElement.classList.add('hide');  // Hide previous result
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

// Set the next question in the quiz
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Display the current question and its answers
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Reset the state for the next question
function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Select the answer and check if it's correct
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;  // Increment score if the answer is correct
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        resultElement.innerText = `Quiz finished! Your score: ${score} out of 10`;
        resultElement.classList.remove('hide');
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

// Apply correct or wrong styles based on answer
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Clear any existing status classes
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
