const MAX_PROBLEMS = 200
//TIMER CODE
document.getElementById('timer').innerText = "05:00";
var interval;
function startTimer(duration, display) {
    var timer = duration;
    var minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            alert('timer completed');
            clearInterval(interval);
            checkLeaderboard();
        }
        
    }, 1000);
}
function callTimer(){
    var duration = 60*5;
    var display = document.querySelector('#timer');
    document.getElementById('start-timer-button').style.display = 'none';
    startTimer(duration, display);
    document.getElementById('answer-box').focus()
}


//helper function to update seconds display properly
function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}
//-------------------------------------------------------------------------------------

//IDENTIFY SELECTED TOPIC
//add event listener to each topic's button
const topics = document.querySelectorAll('.topic-box');
topics.forEach(topic => {
    const symbol = topic.classList[1]; //grab topic from class given to buttons
    topic.addEventListener('click', function(){
        topicClicked(symbol);
    } );
})

var problems = [];
var probCount = 0; //counting which problem we are on, from 0-99, to access it in the array
//loads the appropriate set of problems based on which button was pressed
function topicClicked(topic){
    //APPLY fade transition to topic screen
    const topics = document.querySelectorAll('.topic-box')
    topics.forEach(t => {
        t.classList.add('fade')
    })
    document.getElementById('title').classList.add('fade')

    //UNAPPLY fade transition from problem screen
    document.getElementById('information-container').classList.remove('fade')
    document.getElementById('switch-topic-button').classList.remove('fade')
    document.getElementById('problem-box').classList.remove('fade')

    //load problems
    document.getElementById('title').addEventListener('animationend', ()=>{
        document.getElementById('information-container').style.display = "flex";
        showProblems(topic)
    })
    
    //bring back Start button
    document.getElementById('start-timer-button').style.display = 'block'
}

var sym; //global variable to let the app know which category is being solved
function showProblems(topic){
    document.getElementById('topics-container').style.display = "none";
    document.getElementById('title').style.display = "none";
    document.getElementById('switch-topic-button').style.display = "flex";
    document.getElementById('problem-box').style.display = "flex";
    
    switch(topic){
        case "addition":
            sym = "+";
            loadAddition();
            numberUpdater(sym);
            break;
        case "subtraction":
            sym = "-";
            loadSubtraction();
            numberUpdater(sym);
            break;
        case "multiplication":
            sym = "&times";
            loadMultiplication();
            numberUpdater(sym);
            break;
        case "division":
            sym = "&divide";
            loadDivision();
            numberUpdater(sym);
            break;
    }
}


//-------------------------------------------------------------------------------------

//CREATING PROBLEM SETS
//There will be 100 generated questions for whichever topic is chosen
//-------------------------------------------------------------------------------------

function loadAddition(){
    var num1;
    var num2;
    var ans;
    problems = [];
    for(var i=0; i<MAX_PROBLEMS; i++){
        num1 = Math.floor(Math.random() * 11);                  //first number between 0-30
        num2 = Math.floor(Math.random() * 11);                  //second number between 0-30
        ans = num1+num2;
        problems.push({num1: num1, num2: num2, ans: ans});  
    }
    
}

function loadSubtraction(){
    var num1;
    var num2;
    var ans;
    problems = [];
    for(var i=0; i<MAX_PROBLEMS; i++){
        num1 = Math.floor(Math.random() * 16) + 5;              //first number must be between 5-20
        num2 = Math.floor(Math.random() * (num1-1)) + 1;        //second number must be less than first
        ans = num1-num2;
        problems.push({num1: num1, num2: num2, ans: ans});  
    }
}

function loadMultiplication(){
    var num1;
    var num2;
    var ans;
    problems = [];
    for(var i=0; i<MAX_PROBLEMS; i++){
        num1 = Math.floor(Math.random() * 12) + 1;                  //first number between 1-12
        num2 = Math.floor(Math.random() * 12) + 1;                  //second number between 1-12
        ans = num1*num2;
        problems.push({num1: num1, num2: num2, ans: ans});  
    }
}



function loadDivision(){
    var factor1;
    var factor2;
    var product;
    problems = [];
    for(var i=0; i<MAX_PROBLEMS; i++){
        factor1 = Math.floor(Math.random() * 13);                  //multiply two numbers first to ensure generated factors are divisible 
        factor2 = Math.floor(Math.random() * 12) + 1;              //plus one to exclude 0 as a possibility for the denominator
        product = factor1 * factor2;
        problems.push({num1: product, num2: factor2, ans: factor1});  
    }
}

//-------------------------------------------------------------------------------------

//SUBMITTING ANSWER
//pressing Enter while the input field is in focus will submit the form and call this function
function verifyAnswer(){
    //allow form to submit information and clear field without refreshing the page
    const ans = document.getElementsByClassName('answer-box')[0].value;
    if(ans == problems[probCount].ans){
        document.getElementById('answer-form').reset();
        return true;
    } else{ 
        document.getElementById('answer-form').reset();
        return false;
    }
    
}
function numberUpdater(sym){
    document.getElementsByClassName('top-number')[0].innerText = problems[probCount].num1;
    document.getElementsByClassName('symbol')[0].innerHTML = sym;
    document.getElementsByClassName('bottom-number')[0].innerText = problems[probCount].num2;  
}

//goes through all the problems and verifies validity of each answer
function mainDriver(){
    var sym = document.getElementsByClassName('symbol')[0].innerHTML;
    if(verifyAnswer()){
        probCount+=1;
        if(probCount>=MAX_PROBLEMS){
            alert("All problems completed!")
        }
        else{
            document.getElementById('problem-count').innerText = `${(probCount+1)}/${MAX_PROBLEMS}`;
            numberUpdater(sym);
        }
    }
    else{
        alert("wrong!");
    }
    
}

//FUNCTION TO BRING BACK TOPICS
function switchTopic(){
    //apply and unapply fade transition to elements based on whether we are picking a topic or solving problems
    //----------------------------------
    //APPLYING to problem page
    document.getElementById('information-container').classList.add('fade')
    document.getElementById('switch-topic-button').classList.add('fade')
    document.getElementById('problem-box').classList.add('fade')

    //UNAPPLYING from topic selection page
    const topics = document.querySelectorAll('.topic-box')
    topics.forEach(t => {
        t.classList.remove('fade')
    })
    document.getElementById('title').classList.remove('fade')

    document.getElementById('problem-box').addEventListener('animationend', ()=>{
        //bring back topic selection and remove problem interface
        document.getElementById('switch-topic-button').style.display = "none";
        document.getElementById('topics-container').style.display = "flex";
        document.getElementById('title').style.display = "flex";
        document.getElementById('information-container').style.display = "none";
        clearInterval(interval);
        document.getElementById('timer').innerText = "05:00";
        document.getElementById('problem-count').innerText = "1/100";
        probCount = 0;
        document.getElementById('problem-box').style.display = "none";
    })
    
}


//If a new top highscore is achieved, display an animation
function newRecordAnimation(){
    document.getElementById('new-record-animation').style.display = 'block'
    document.getElementById('new-record-animation-text').style.display = 'block'
}
//add event listener to make animation dissapear after its done
const animationStar = document.getElementById('new-record-animation')
animationStar.addEventListener('animationend', ()=>{
    animationStar.style.animation = ''
    animationStar.style.display = 'none'
})
const animationStarText = document.getElementById('new-record-animation-text')
animationStarText.addEventListener('animationend', ()=>{
    animationStarText.style.animation = ''
    animationStarText.style.display = 'none'
})


//helper function to prevent repeated code
function helpCheckLeaderboard(cat, score){
    //retrieve high scores in sorted order, or if empty: highScores = ''
    const highScores = getHighScores(cat)
    
    //if there are not 5 scores yet, just add it
    if(highScores.length < 5){
        //if highest score overall, play an animation
        if(highScores.length > 0){ //make sure array is not empty so theres no null access exception
            if(score > highScores[0]){
                newRecordAnimation()
            }
        }
        updateStorage(cat, score)
    }
    //if 5 scores exist, we need to see if we add this one
    else{
        //check the current score against the current top 5
        let i = 0;
        while(i < highScores.length){
            if(score > highScores[i]){
                //if highest score overall, play an animation
                if(i == 0){
                    newRecordAnimation()
                }
                updateStorage(cat, score)
                break;
            }
            i++;
        }
        //Delete lowest score if we ended up adding this new score
        checkSize(cat)
    }
}

//check the leaderboard and update if necessary
function checkLeaderboard(){
    const score = probCount;
    var cat;
    //check score to appropriate high score
    //sym is global variable letting us know what type of problems are being done currently
    switch(sym){
        case "+":
            cat = "addition"
            //call helper function since each case will run the same code but with a different value of 'cat'
            helpCheckLeaderboard(cat, score)
            break;
        case "-":
            cat = "subtraction"
            helpCheckLeaderboard(cat, score)
            break;
        case "&times":
            cat = "multiplication"
            helpCheckLeaderboard(cat, score)
            break;
        case "&divide":
            cat = "division"
            helpCheckLeaderboard(cat, score)
            break;
    }


}

//If array has more than 5 scores, delete lowest one
function checkSize(category){
    var array = getHighScores(category)
    if(array.length > 5){
        console.log(array)
        console.log(array.pop())
    }
    localStorage.setItem(category, JSON.stringify(array))
}

//update local storage arrays holding high scores
function updateStorage(category, score){
    let array;
    //if the array does not exist, create it and set the current score as the initial value
    if(localStorage.getItem(category) === null){
        array = []
    }
    else{
        array = JSON.parse(localStorage.getItem(category))
    }

    array.push(score)

    localStorage.setItem(category, JSON.stringify(array))
}

//sort and return the array of the appropriate topic
function getHighScores(category){
    var array = JSON.parse(localStorage.getItem(category))
    if(array === null){
        return ''
    }
    console.log(array)
    array.sort(function(a, b){return b-a})
    return array
}

//set problem counter
function initializeProbCount(){
    document.getElementById('problem-count').innerText = `1/${MAX_PROBLEMS}`
}

initializeProbCount()