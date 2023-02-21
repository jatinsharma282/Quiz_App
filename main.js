// In questions named object, we have made an array of 5 objects(questions) with Key-value pairs in them
const questions = [{
    'que': 'Which of the following is a Markup Language?',
    'a': 'HTML',
    'b': 'CSS',
    'c': 'JavaScript',
    'd': 'PHP',
    'correct': 'a'
},
{
    'que': "What year was JavaScript launched?",
    'a': "1996",
    'b': "1995",
    'c': "1994",
    'd': "none of the above",
    'correct': "b"
},
{
    'que': "What does CSS stands for?",
    'a': "Hypertext Markup Language",
    'b': "Cascading Style Sheet",
    'c': "Jason Object Notation",
    'd': "Helicopters Terminals Motorboats Lamborginis",
    'correct': "b"
},
{
    'que': 'Which of the following is a Client Site Language?',
    'a': "Java",
    'b': "C",
    'c': "Python",
    'd': "JavaScript",
    'correct': "d"
},
{
    'que': "What does HTML stand for?",
    'a': "Hypertext Markup Language",
    'b': "Cascading Style Sheet",
    'c': "Jason Object Notation",
    'd': "Helicopters Terminals Motorboats Lamborginis",
    'correct': "a"
}
];

// Timer Js
let time_element = document.getElementById("timer");
let time;
const total_time = 20; // The total time of timer we want to keep in seconds
let sec = total_time;

function timer() {
    time_element.innerHTML = sec; // In html, it will keep on setting(assigning) sec in <p> element
    sec--; // This will keep on decreasing time in seconds after every 1 sec
    if (sec == 0) {
        sec = total_time;
        clearInterval(time);
        index++;
        loadQuestion();
    }
}

// A function to show question and options on html page
let index = 0;
let right = 0, wrong = 0;
total = questions.length;
const quesBox = document.getElementById("quesBox");
let optionInputs = document.querySelectorAll('.options')

// loadQuestion() function will load(show) question to us
const loadQuestion = () => {
    sec = total_time; //assign sec to total time of timer
    clearInterval(time);
    timer(); // This will call the timer() function for the first time(first sec)
    // For the next time, timer() function will be called again after 1 sec of time interval for every next sec
    time = setInterval(timer, 1000);

    if (total === index) {
        // show final result
        clearInterval(time);
        return endQuiz();
    } else {
        reset();
        const data = questions[index]
        quesBox.innerHTML = `${index + 1}) ${data.que}`
        optionInputs[0].nextElementSibling.innerText = data.a
        optionInputs[1].nextElementSibling.innerText = data.b
        optionInputs[2].nextElementSibling.innerText = data.c
        optionInputs[3].nextElementSibling.innerText = data.d
    }
}

// This submitQuiz function will submit the quiz answers and it will check the answers
const submitQuiz = () => {
    const data = questions[index];
    const ans = getAnswer()
    if (ans === data.correct) {
        right++;
    } else {
        wrong++;
    }
    // selects next question data
    index++;
    // show next question
    loadQuestion();
    return;
}

// getAnswer() function will iterate all our options and returns the value of selected option(input) by the user
const getAnswer = () => {
    let answer;
    optionInputs.forEach(
        (input) => {
            if (input.checked) {
                answer = input.value;
            }
        })

    if (answer) {
        alert(`Your have submitted option ${answer} for the Question no. ${index + 1}!!`);
    } else {
        alert(`You have submitted no option for the Question no. ${index + 1}!!`);
    }

    return answer;
}

// reset() function will reset(uncheck) all the selected options of next questions
const reset = () => {
    optionInputs.forEach(
        (input) => {
            input.checked = false;
        })
}


// This function will run when the quiz gets end and it will declare the quiz result
const endQuiz = () => {
    var username = prompt("Enter your name to submit the quiz");
    swal("Success!", `${username} your quiz inputs are submitted Sucessfully!!`, "success");
    document.getElementById("box").innerHTML = `
        <div style = "text-align:center">
            <h3> Hii, ${username} Thank you for playing the quiz </h3>
            <h2> You've scored ${right} / ${total} </h2>
        </div>`
}

// initial call
loadQuestion(index);


/////////////////////////////********************************************************////////////////////////////////////////////////
// let index = 0; // This will load first question data(question with index 0) whenever we visits the page
// const quesBox = document.getElementById("quesBox"); // This will put all our questions in quesBox variable
// let optionInputs = document.querySelectorAll('.options') // This will select all our inputs with class="options"

// const data = questions[index] // This will take out data(questions data) from index of questions(objects)
// quesBox.innerHTML = `${index + 1}) ${data.que}` // Here we are putting questions directly in h2 with id='quesBox' in html

// time = setInterval(timer, 1000); :- It sets the speed(duration) of the timer to 1 second for every next sec that means every next sec will be appear after 1 sec.

// initial call means call the loadQuestion() function as soon as the page gets loaded, then this loadQuestion(index) function will display the Ist question data(first question with 4 options) when anyone visits this page.
// optionsInputs[0].nextElementSibling.innerText = data.a means select the next element sibling of the first input of option that means we have selected first <input> tag(first option) i.e. 0th key option then with the help of nextElementSibling we selected the <label> tag present next to it, then have put the input data of all a options(key a of all objects or questions) in the innerText of <label> tag.

// optionsInputs[1].nextElementSibling.innerText = data.b means select the next element sibling of the second input of option that means we have selected second <input> tag(second option) i.e. 1st key option then with the help of nextElementSibling we selected the <label> tag present next to it, then have put the input data of all b options(key b of all objects or questions) in the innerText of <label> tag.

// In getAnswer(), we have given a call back in optionInputs.forEach() and it will give us input one by one by using a loop. So, when first input comes to us, then we will apply our logic to the first input. In input.checked, checked is a attribute in javascript, which sets or returns the checked state of a checkbox. Here it returns the checked state of a checkbox that means it will find out if a checkbox is checked or not. So here input.checked means if input is checked, then return input.value that means here a loop is running on each and every input, which is checking the checked attribute of it and as the checked attribute comes then it will return the value of checked(selected) input and that value can be either a or b or c or d.
// So, the forEach() function in getAnwer() function will check the value of checked input and store that value in answer variable and after the completion of forEach() function, the answer variable will return the forEach() function. We will take that answer in ans constant present in submitQuiz() function. So ans will contain the answer(input) selected by the user.

// if(ans === data.correct){right++;} :- This means if the user selected answer and correct answer matches with each other then we have to do right++, else we have to do wrong++. submitQuiz() function will submit(take) the answer selected by the user and then it will check whether the answer selected by the user is correct or wrong.

// index++ and loadQuestion() will take us to next question that means we are again calling the loadQuestion() function by increasing the value of index of the questions with index++ that means we want to go to next question with next index value. So when we click on submit button then next question will be displayed to us.
// But when we went to the next question, then the same option in next question is shown selected previously. This happen because here only the text(question) changes and the form does not got reset. So here we have to make a reset named function and then we have to call that reset() function in loadQuestion() function, which will reset all the selected options when next question gets loaded(displayed) on the screen. In reset(), we have to run the same forEach() loop that we used in getAnswer() and in loop we have to write input.checked = false; which will take all the inputs one by one and make their checked false that means it will remove all the checked from all the inputs of the next question. This is called reset. reset() will run when the next question gets loaded.

// if(total === index){return endQuiz();} :- Here loadQuestion() function will check if index(index value that we got from submitQuiz() function) is equalto total number of questions or not. If index is equal to total(that means it is out of range) then that means quiz is completed and we have to run endQuiz() function which will declare the result to us, else we have to run reset() function and load the next question and continue the quiz.  

