// code by webdevtrick (https://webdevtrick.com)
// Credit to Jake Wagner for finding this Website
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("Who is Tony Soprano's Wife?", ["Carmela", "Gloria","Livia", "Jennifer"], "Carmela"),
    new Question("What New York family member moved to New Jersey?", ["Phil Leotardo", "Carmine Lupertazzi", "Johnny Sack", "Jimmy Altieri"], "Johnny Sack"),
    new Question("What is the name of Tony's Horse?", ["Secretariet", "Pie-Oh-My","Gabagool", "The Italian Stallion"], "Pie-Oh-My"),
    new Question("What is the name of Artie Bucco's Restaurant?", ["Vesuvio", "Bada-Bing", "Satriele's", "Holsten's"], "Vesuvio"),
    new Question("What is the real name of Tony's Uncle?", ["Junior", "Corrado", "Christopher", "Ralphie"], "Corrado")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();