var countdownIntervalID = null;
var timeLeft = 25 * 60;

// Pomodoros are the work periods (the 25 minutes).
// After 4 after completed, a long break is taken instead of a short.
var pomodoros = 1;
var currentTimerMode = "Pomodoro";

var tickingAudio = document.getElementById("ticking-audio");
var alarmAudio = document.getElementById("alarm-audio");

document.getElementById("pomodoro-button").style.background = "rgba(0, 0, 0, 0.1)";
document.getElementById("pomodoro-button").style.fontWeight = "bold";

function resetButton() {
    var startButton = document.getElementById("start-button");
    startButton.textContent = "START";
    startButton.style.boxShadow = "rgb(235, 235, 235) 0px 6px 0px";
    startButton.style.marginTop = "8px";
    startButton.style.marginBottom = "6px";
    startButton.onclick = startCountdown;
}

function resetTimerButtons() {
    document.getElementById("pomodoro-button").style.background = "none";
    document.getElementById("pomodoro-button").style.fontWeight = "normal";
    document.getElementById("short-button").style.background = "none"
    document.getElementById("short-button").style.fontWeight = "normal";
    document.getElementById("long-button").style.background = "none"
    document.getElementById("long-button").style.fontWeight = "normal";
}

function updateTitle() {
    var timerText = document.getElementById("timer-text");
    document.title = `${timerText.textContent} - ${currentTimerMode}`;
}

function timerOver() {
    if (currentTimerMode === "Pomodoro") {
        if (pomodoros % 4 === 0) {
            longClick();
        } else {
            shortClick();
        }

        pomodoros += 1;

    } else {
        pomodoroClick();
    }
}

function countdown() {
    timeLeft -= 1;

    var timerText = document.getElementById("timer-text");

    var minutes = String(parseInt(timeLeft / 60)).padStart(2, "0");
    var seconds = String(timeLeft % 60).padStart(2, "0");

    timerText.textContent = `${minutes}:${seconds}`;

    updateTitle();

    if (timeLeft <= 0) {
        alarmAudio.play();
        timerOver();
    }
}

function startCountdown() {
    countdownIntervalID = setInterval(countdown, 1000);
    
    tickingAudio.loop = true;
    tickingAudio.play();

    var startButton = document.getElementById("start-button");
    startButton.textContent = "PAUSE";
    startButton.style.boxShadow = "none";
    startButton.style.marginTop = "14px";
    startButton.style.marginBottom = "0";
    startButton.onclick = stopCountdown;
}

function stopCountdown() {
    clearInterval(countdownIntervalID);
    tickingAudio.loop = false;
    tickingAudio.pause();
    tickingAudio.currentTime = 0;
    resetButton();
}

// A later improvement would be making all the click functions into one rather
// three.

function pomodoroClick() {
    stopCountdown();

    document.body.style.backgroundColor = "rgb(186, 73, 73)";
    var startButton = document.getElementById("start-button");
    startButton.style.color = "rgb(186, 73, 73)";

    resetTimerButtons();
    document.getElementById("pomodoro-button").style.background = "rgba(0, 0, 0, 0.1)";
    document.getElementById("pomodoro-button").style.fontWeight = "bold";

    currentTimerMode = "Pomodoro";
    timeLeft = 25 * 60;
    document.getElementById("timer-text").textContent = "25:00";

    updateTitle();

    var counter = document.getElementById("pomodoro-counter");
    counter.textContent = `# ${pomodoros}`;
}

function shortClick() {
    stopCountdown();

    document.body.style.backgroundColor = "rgb(56, 133, 138)";
    var startButton = document.getElementById("start-button");
    startButton.style.color = "rgb(56, 133, 138)";

    resetTimerButtons();
    document.getElementById("short-button").style.background = "rgba(0, 0, 0, 0.1)";
    document.getElementById("short-button").style.fontWeight = "bold";

    currentTimerMode = "Short Break"; 
    timeLeft = 5 * 60;
    document.getElementById("timer-text").textContent = "05:00";

    updateTitle();
}

function longClick() {
    stopCountdown();
    document.body.style.backgroundColor = "rgb(57, 112, 151)";
    var startButton = document.getElementById("start-button");
    startButton.style.color = "rgb(57, 112, 151)";

    resetTimerButtons();
    document.getElementById("long-button").style.background = "rgba(0, 0, 0, 0.1)";
    document.getElementById("long-button").style.fontWeight = "bold";

    currentTimerMode = "Long Break";
    timeLeft = 15 * 60;
    document.getElementById("timer-text").textContent = "15:00";

    updateTitle();
}
