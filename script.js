document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: 'What is the capital of France?',
            answers: ['London', 'Paris', 'Berlin', 'Madrid'],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [, 'Mars','Jupiter' ,'Earth', 'Saturn'],
            answer: "Mars"
        },
        {
            question: "Name the largest mammal?",
            answers: ['Elephant', 'Shark','Blue Whale', ,'Giraffe'],
            answer: "Blue Whale"
        },
        {
            question: "Sun rises in the.....",
            answers: ['West','North', 'South', 'East'],
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
            answers: ['Nikola Tesla', 'Michael Faraday', 'Thomas Edison', 'Benjamin Franklin',],
            answer: "Benjamin Franklin"
        },
        {
            question: "What is the boiling point of water?",
            answers: ['90 degrees Celsius', '100 degrees Celsius', '212 degrees Fahrenheit', '0 degrees Celsius'],
            answer: "100 degrees Celsius"
        },
        {
            question: "What is the smallest country in the world by land area?",
            answers: [ 'Vatican City','San Marino', 'Monaco', 'Nauru'],
            answer: "Vatican City"
        },
        {
            question: "Who discovered penicillin?",
            answers: ['Louis Pasteur', 'Alexander Fleming', 'Joseph Lister', 'Marie Curie'],
            answer: "Alexander Fleming"
        }
    ];
    
   const startBtn=document.getElementById('start-btn');
   const nextBtn=document.getElementById('next-btn');
   const restartBtn=document.getElementById('restart-btn');
   const questionContainer=document.getElementById('question-container');
   const resultContainer=document.getElementById('result-container');
   const questionText=document.getElementById('question-text');
   const choicesList=document.getElementById('choices-list');
   const scoreDisplay=document.getElementById('score');

   let currentQuestionIndex=0;
   let score=0;

   if (localStorage.getItem('quizProgress')) {
        const savedState = JSON.parse(localStorage.getItem('quizProgress'));
        currentQuestionIndex = savedState.currentQuestionIndex;
        score = savedState.score;
        startQuiz();
    }

   startBtn.addEventListener('click',startQuiz); //startQuiz is passed as a reference
   //do not write startQuiz() as it will call the function immediately and we want it to be called only when the button is clicked

    nextBtn.addEventListener('click', () => {
        if (selectedOption === questions[currentQuestionIndex].answer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

   restartBtn.addEventListener('click',()=>{
        currentQuestionIndex=0;
        score=0;
        resultContainer.classList.add('hidden');
        startQuiz();
   });

   function startQuiz(){
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion();
   }

   function showQuestion(){
    nextBtn.classList.add('hidden');
    questionText.innerText=questions[currentQuestionIndex].question;
    choicesList.innerHTML='';  //clear previous choices
    selectedOption=null;

    questions[currentQuestionIndex].answers.forEach(choice=>{
        const li=document.createElement('li');
        li.textContent=choice;
        li.addEventListener('click',()=>selectAnswer(li,choice)); //we are passing function as a reference here 
        //Note: if we write li.addEventListener('click',selectAnswer(li,choice)); then it will call the function immediately. Solution -> use a callback like ()=>selectAnswer(li,choice)
        choicesList.appendChild(li);
    })

    // Restore previous selection
    localStorage.setItem('quizProgress', JSON.stringify({
        currentQuestionIndex: currentQuestionIndex,
        score: score
    }));

   }


    function selectAnswer(li, choice) {
        // Remove previous selection
        Array.from(choicesList.children).forEach(option => { //choiceList is the list of choices and there children are the choices which will be made unselected
            option.classList.remove('selected');
        });

        // Highlight selected option
        li.classList.add('selected'); 
        selectedOption = choice; // Store the selected choice
        nextBtn.classList.remove('hidden'); // Show next button after selecting
    }


   function showResult(){
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.innerText=`${score} out of ${questions.length}`;
        localStorage.removeItem('quizProgress'); // Remove progress after finishing
   }
});
