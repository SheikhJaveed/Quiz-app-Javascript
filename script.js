document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: 'What is the capital of France?',
            answers: ['London', 'Paris', 'Berlin', 'Madrid'],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ['Venus', 'Mars', 'Jupiter', 'Earth'],
            answer: "Mars"
        },
        {
            question: "Name the largest mammal?",
            answers: ['Elephant', 'Shark', 'Blue Whale', 'Giraffe'],
            answer: "Blue Whale"
        },
        {
            question: "Sun rises in the.....",
            answers: ['West', 'North', 'South', 'East'],
            answer: "East"
        },
        {
            question: "Name the first man to walk on the Moon?",
            answers: ['Buzz Aldrin', 'Michael Collins', 'Neil Armstrong', 'Yuri Gagarin'],
            answer: "Neil Armstrong"
        },
        {
            question: "Name the densest jungle in the world?",
            answers: ['The Congo rainforest', 'The Amazon rainforest', 'Madagascar rainforest', 'Borneo rainforest'],
            answer: "The Amazon rainforest"
        },
        {
            question: "Who invented electricity?",
            answers: ['Nikola Tesla', 'Michael Faraday', 'Thomas Edison', 'Benjamin Franklin'],
            answer: "Benjamin Franklin"
        },
        {
            question: "What is the boiling point of water?",
            answers: ['90 degrees Celsius', '100 degrees Celsius', '212 degrees Fahrenheit', '0 degrees Celsius'],
            answer: "100 degrees Celsius"
        },
        {
            question: "What is the smallest country in the world by land area?",
            answers: ['Vatican City', 'San Marino', 'Monaco', 'Nauru'],
            answer: "Vatican City"
        },
        {
            question: "Who discovered penicillin?",
            answers: ['Louis Pasteur', 'Alexander Fleming', 'Joseph Lister', 'Marie Curie'],
            answer: "Alexander Fleming"
        }
    ];
    
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    const questionText = document.getElementById('question-text');
    const choicesList = document.getElementById('choices-list');
    const scoreDisplay = document.getElementById('score');
    const wrongAnswersList = document.getElementById('wrong-answers');

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    let wrongAnswers = [];

    if (localStorage.getItem('quizProgress')) {
        const savedState = JSON.parse(localStorage.getItem('quizProgress'));
        currentQuestionIndex = savedState.currentQuestionIndex;
        score = savedState.score;
        wrongAnswers = savedState.wrongAnswers || [];
        startQuiz();
    }

    startBtn.addEventListener('click', startQuiz);

    nextBtn.addEventListener('click', () => {
        if (selectedOption === questions[currentQuestionIndex].answer) {
            score++;
        } else {
            wrongAnswers.push({
                question: questions[currentQuestionIndex].question,
                selected: selectedOption || "No Answer",
                correct: questions[currentQuestionIndex].answer
            });
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        wrongAnswers = [];
        resultContainer.classList.add('hidden');
        wrongAnswersList.innerHTML = '';
        startQuiz();
    });

    function startQuiz() {
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add('hidden');
        questionText.innerText = `${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].question}`;
        choicesList.innerHTML = '';
        selectedOption = null;

        questions[currentQuestionIndex].answers.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => selectAnswer(li, choice));
            choicesList.appendChild(li);
        });

        localStorage.setItem('quizProgress', JSON.stringify({
            currentQuestionIndex: currentQuestionIndex,
            score: score,
            wrongAnswers: wrongAnswers
        }));
    }

    function selectAnswer(li, choice) {
        Array.from(choicesList.children).forEach(option => {
            option.classList.remove('selected');
        });

        li.classList.add('selected');
        selectedOption = choice;
        nextBtn.classList.remove('hidden');
    }

    function showResult() {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.innerText = `${score} out of ${questions.length}`;

        localStorage.removeItem('quizProgress');

        // Display wrong answers
        wrongAnswersList.innerHTML = "";
        if (wrongAnswers.length > 0) {
            const wrongAnswersTitle = document.createElement('h3');
            wrongAnswersTitle.innerText = "Wrong Answers:";
            wrongAnswersList.appendChild(wrongAnswersTitle);

            wrongAnswers.forEach(({ question, selected, correct }) => {
                const item = document.createElement('p');
                item.innerHTML = `<br><strong>${question}</strong><br> ❌ Your Answer: ${selected} <br> ✅ Correct Answer: ${correct} <br>`;
                wrongAnswersList.appendChild(item);
            });
        } else {
            wrongAnswersList.innerHTML = "<p>🎉 Perfect Score! No wrong answers!</p>";
        }
    }
});
