const questions = [
    {
        question: "What color is a banana?",
        answers: ["Yellow", "Blue", "Red", "Purple"],
        correct: 0
    },
    {
        question: "Which animal says Meow?",
        answers: ["Dog", "Cat", "Cow", "Goat"],
        correct: 1
    },
    {
        question: "How many legs does a spider have?",
        answers: ["6", "8", "4", "10"],
        correct: 1
    },
    {
        question: "Which fruit is red?",
        answers: ["Banana", "Apple", "Orange", "Pear"],
        correct: 1
    },
    {
        question: "Which animal is the King of the Jungle?",
        answers: ["Tiger", "Lion", "Goat", "Elephant"],
        correct: 1
    },
    {
        question: "What color is the sky?",
        answers: ["Blue", "Green", "Pink", "Black"],
        correct: 0
    },
    {
        question: "How many days are in one week?",
        answers: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "Which one can fly?",
        answers:  ["Fish", "Bird", "Dog", "Cow"],
        correct: 1
    },
    {
        question: "How many eyes do most people have?",
        answers: ["1", "2", "3", "4"],
        correct: 1
    },
    {
        question: "What comes after A?",
        answers: ["C", "D", "B", "E"],
        correct: 2
    }
];
let currentQuestion =
    Number(localStorage.getItem("quizQuestion")) || 0;

let score =
    Number(localStorage.getItem("quizScore")) || 0;
if(currentQuestion >= questions.length){

    currentQuestion = 0;
    score = 0;

    localStorage.removeItem("quizQuestion");
    localStorage.removeItem("quizScore");
}
let shuffledAnswers = [];

const questionText = document.getElementById("question");
const questionNumber = document.getElementById("questionNumber");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextBtn = document.getElementById("nextBtn");
const scoreText = document.getElementById("score");

function loadQuestion(){

    nextBtn.style.display = "none";

   const q = questions[currentQuestion];

    questionNumber.innerHTML =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;

    questionText.innerHTML = q.question;

}
function showAnswers(){

    const q = questions[currentQuestion];

    shuffledAnswers = q.answers.map((answer, index) => ({
        text: answer,
        correct: index === q.correct
    }));

    shuffledAnswers.sort(() => Math.random() - 0.5);

    answerButtons.forEach((button, index) => {

        button.innerHTML = shuffledAnswers[index].text;

        button.disabled = false;

        button.classList.remove("correct");
        button.classList.remove("wrong");

    });
}
answerButtons.forEach((button, index) => {

    button.onclick = function(){

        checkAnswer(index);

    };

});
function checkAnswer(selectedIndex){

    answerButtons.forEach(button => {
        button.disabled = true;
    });

    if(shuffledAnswers[selectedIndex].correct){

        answerButtons.forEach(button => {
        button.disabled = true;
    });

    

        answerButtons[selectedIndex]
            .classList.add("correct");

        score++;

    }else{

        answerButtons[selectedIndex]
            .classList.add("wrong");

        shuffledAnswers.forEach((answer, index) => {

            if(answer.correct){
                answerButtons[index]
                    .classList.add("correct");
            }

        });
    }

    scoreText.innerHTML =
        "Score: " + score + "/" + questions.length;

    nextBtn.style.display = "block";
}
loadQuestion();
showAnswers();
nextBtn.onclick = function(){

    currentQuestion++;

    if(currentQuestion < questions.length){

        loadQuestion();
        showAnswers();

    }else{

        showResult();
            
        
        

    }

};
  function showResult(){

    let message = "";

    if(score >= 8){

        message = "🌟 Amazing! 🌟";

    }else if(score >= 5){

        message = "🎉 Great Job! 🎉";

    }else{

        message = "😊 Good Try! 😊";

    }

    document.querySelector(".container").innerHTML = `
    
        <div class="result-screen">

            <div class="stars">⭐ ✨ ⭐</div>

            <h1>🎉 Quiz Finished!</h1>

            <h2>${message}</h2>

            <div class="final-score">
                ${score}/${questions.length}
            </div>

            <p>Keep learning and have fun! 🥳</p>
<button onclick="location.reload()">
    🔄 Play Again
</button>

<button onclick="window.location.href='../index.html'">
    🏠 Back to Home
</button>
        </div>
    
    `;
                  }
