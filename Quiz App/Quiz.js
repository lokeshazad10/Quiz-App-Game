//array questions
const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        correct: "Harper Lee"
    },
    {
        question: "What is the smallest planet in our solar system?",
        choices: ["Earth", "Mars", "Mercury", "Venus"],
        correct: "Mercury"
    },
    {
        question: "Who is the current President of India?",
        choices: ["Ramnath Kowind", "Narendra Modi", "Draupadi Murmu", "Pt. Jawaharlal Nehru"],
        correct: "Draupadi Murmu"
    }
];

//initializing indices
let currectQuestionIndex = 0;
let optionIndex = 0;
let score = 0;

//accessing html elements
const questionPara = document.getElementById('question');
const optionBox = document.querySelector('.options');
const nextBtn = document.getElementById('next-btn');

//function for start quiz
function startQuiz(){
    currectQuestionIndex = 0;
    optionIndex = 0;
    score = 0;
    loadQuiz(currectQuestionIndex);
}

//function for load Questions
function loadQuiz(index){
    resetState();

    let currentIndex = quizData[index];
    let questionNo = index + 1;
    let options = currentIndex.choices;
    questionPara.innerText = questionNo + ". " + currentIndex.question;

    //code for showing options
    options.forEach(option=>{
        const optBtn = document.createElement('button');
        optBtn.innerText = options[optionIndex];
        optionBox.appendChild(optBtn);
        optBtn.classList.add('option-btn');
        optionIndex++;

//code for highlighting correct and incorrect choice
        optBtn.addEventListener('click', ()=>{
            if(optBtn.innerText === currentIndex.correct){
                optBtn.style.backgroundColor = 'rgba(37, 179, 37, 0.7)';
                optBtn.style.color = '#fff';
                score++;
            }else{
                optBtn.style.backgroundColor = 'rgba(216, 36, 36, 0.7)';
                optBtn.style.color = '#fff';
            } 
            Array.from(optionBox.children).forEach(button =>{
                if(button.innerText === currentIndex.correct){
                    button.style.backgroundColor = 'rgba(37, 179, 37, 0.7)';
                    button.style.color = '#fff';
                }
                button.disabled = true;
            });
            nextBtn.style.display = "block";
            if(currectQuestionIndex == quizData.length-1){
                nextBtn.innerText = "Submit";
            }

        });
    });
    optionIndex = 0;
}

function showScore(){
    resetState();

    optionBox.innerHTML = `<p>You scored  ${score} out of ${quizData.length}`
}

function handleNextButton(){
    currectQuestionIndex++;
    if(currectQuestionIndex < quizData.length){
        loadQuiz(currectQuestionIndex);
    }else{
        while(questionPara.firstChild){
            questionPara.removeChild(questionPara.firstChild);
        }
        showScore();
    }
}

function resetState(){
    nextBtn.style.display = "none";
    while(optionBox.firstChild){
        optionBox.removeChild(optionBox.firstChild);
    }
}

nextBtn.addEventListener('click', ()=>{
    if(currectQuestionIndex < quizData.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
