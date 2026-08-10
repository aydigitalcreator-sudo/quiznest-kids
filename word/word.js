const questions = [
    {
        question: "Which letter comes first in Apple?",
        answers: ["B", "A", "C", "D"],
        correct: 1
    },
    {
        question: "Which word starts with B?",
        answers: ["Cat", "Ball", "Dog", "Fish"],
        correct: 1
    },
    {
        question: "Which word starts with C?",
        answers: ["Apple", "Cat", "Ball", "Dog"],
        correct: 1
    },
    {
        question: "Which word starts with D?",
        answers: ["Dog", "Fish", "Apple", "Ball"],
        correct: 0
    },
    {
        question: "Which word starts with F?",
        answers: ["Cat", "Fish", "Dog", "Apple"],
        correct: 1
    },
    {
        question: "Which word is a fruit?",
        answers: ["Dog", "Apple", "Chair", "Book"],
        correct: 1
    },
    {
        question: "Which word is an animal?",
        answers: ["Table", "Cat", "Ball", "Cup"],
        correct: 1
    },
    {
        question: "Which word is something you can read?",
        answers:
          
["Book", "Dog", "Apple", "Shoe"],
        correct: 0
    },
    {
        question: "Which word means the opposite of BIG?",
        answers: ["Tall", "Small", "Fast", "Hot"],
        correct: 1
    },
    {
        question: "Which word means the opposite of HOT?",
        answers: ["Cold", "Big", "Fast", "Tall"],
        correct: 0
    },
    {
        question: "Which word has 3 letters?",
        answers: ["Apple", "Cat", "House", "Banana"],
        correct: 1
    },
    {
        question: "Which word has 4 letters?",
        answers: ["Dog", "Fish", "Apple", "Banana"],
        correct: 1
    },
    {
        question: "Which word rhymes with CAT?",
        answers: ["Dog", "Hat", "Sun", "Book"],
        correct: 1
    },
    {
        question: "Which word rhymes with DOG?",
        answers: ["Cat", "Log", "Fish", "Tree"],
        correct: 1
    },
    {
        question: "Which word begins with the letter M?",
        answers: ["Moon", "Sun", "Dog", "Cat"],
        correct: 0
  },
    {
        question: "Which word begins with the letter S?",
        answers: ["Ball", "Sun", "Cat", "Dog"],
        correct: 1
    },
    {
        question: "Which word is a color?",
        answers: ["Blue", "Chair", "Dog", "Book"],
        correct: 0
    },
    {
        question: "Which word is something you can wear?",
        answers: ["Shoe", "Apple", "Dog", "Book"],
        correct: 0
    },
    {
        question: "Which word is used for a person who teaches?",
        answers: ["Teacher", "Farmer", "Driver", "Singer"],
        correct: 0
    },
    {
        question: "What comes after the letter C?",
        answers: ["A", "B", "D", "E"],
        correct: 2
    }
];

let currentQuestion =
    Number(localStorage.getItem("wordQuestion")) || 0;

let score =
    Number(localStorage.getItem("wordScore")) || 0;


if (currentQuestion >= questions.length) {
    currentQuestion = 0;
    score = 0;

    localStorage.removeItem("wordQuestion");
    localStorage.removeItem("wordScore");
}


let shuffledAnswers = [];


const questionText =
    document.getElementById("question");

const questionNumber =
    document.getElementById("questionNumber");

const answerButtons =
    document.querySelectorAll(".answer-btn");

const nextBtn =
    document.getElementById("nextBtn");

const scoreText =
    document.getElementById("score");


function loadQuestion() {

    nextBtn.style.display = "none";

    const q = questions[currentQuestion];

    questionNumber.innerHTML =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;

    questionText.innerHTML = q.question;

    scoreText.innerHTML =
        "Score: " + score + "/"
  questions.length;
}


function showAnswers() {

    const q = questions[currentQuestion];

    shuffledAnswers = q.answers.map((answer, index) => ({
        text: answer,
        correct: index === q.correct
    }));


    shuffledAnswers.sort(
        () => Math.random() - 0.5
    );


    answerButtons.forEach((button, index) => {

        button.innerHTML =
            shuffledAnswers[index].text;

        button.disabled = false;

        button.classList.remove("correct");
        button.classList.remove("wrong");
    });
}


answerButtons.forEach((button, index) => {

    button.onclick = function () {

        checkAnswer(index);

    };

});
function checkAnswer(selectedIndex) {

    answerButtons.forEach(button => {
        button.disabled = true;
    });


    if (shuffledAnswers[selectedIndex].correct) {

        answerButtons[selectedIndex]
            .classList.add("correct");

        score++;

    } else {

        answerButtons[selectedIndex]
            .classList.add("wrong");


        shuffledAnswers.forEach((answer, index) => {

            if (answer.correct) {

                answerButtons[index]
                    .classList.add("correct");

            }

        });
    }


    scoreText.innerHTML =
        "Score: " + score + "/" + questions.length;


    localStorage.setItem(
        "wordScore",
        score
    );


    localStorage.setItem(
        "wordQuestion",
        currentQuestion
    );


    nextBtn.style.display = "block";
}


nextBtn.onclick = function () {

    currentQuestion++;


    if (currentQuestion < questions.length) {

        localStorage.setItem(
            "wordQuestion",
          currentQuestion
    );


    nextBtn.style.display = "block";
}


nextBtn.onclick = function () {

    currentQuestion++;


    if (currentQuestion < questions.length) {

        localStorage.setItem(
            "wordQuestion",
            currentQuestion
        );

        loadQuestion();
        showAnswers();

    } else {

        localStorage.removeItem("wordQuestion");
        localStorage.removeItem("wordScore");

        showResult();
    }
};


function showResult() {

    let message = "";


    if (score >= 16) {

        message = "🌟 Amazing Word Master! 🌟";

    } else if (score >= 10) {

        message = "🎉 Great Job! 🎉";

    } else {

        message = "😊 Good Try! Keep Learning! 😊";

    }


    document.querySelector(".container").innerHTML = `

        <div class="result-screen">

            <div class="stars">
                ⭐ ✨ ⭐
            </div>

            <h1>
                🎉 Word Game Finished!
            </h1>

            <h2>
              ${message}
            </h2>

            <div class="final-score">
                ${score}/${questions.length}
            </div>

            <p>
                Keep learning new words! 🥳
            </p>

            <button onclick="location.reload()">
                🔄 Play Again
            </button>

            <button onclick="window.location.href='../index.html'">
                🏠 Back to Home
            </button>

        </div>

    `;
}


// START THE WORD GAME
loadQuestion();
showAnswers();
