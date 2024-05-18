var countdownIntervalID = null;
var timeLeft = 25 * 60;

function countdown() {
    timeLeft -= 1;

    var timerText = document.getElementById("timer-text");

    var minutes = parseInt(timeLeft / 60);
    var seconds = String(timeLeft % 60).padStart(2, "0");

    timerText.textContent = `${minutes}:${seconds}`
}

function startCountdown() {
    countdownIntervalID = setInterval(countdown, 1000);

    var startButton = document.getElementById("start-button");
    startButton.textContent = "STOP";
    startButton.style.boxShadow = "none";
    startButton.style.marginTop = "14px";
    startButton.style.marginBottom = "0";
    startButton.onclick = stopCountdown;

}

function stopCountdown() {
    clearInterval(countdownIntervalID);

    var startButton = document.getElementById("start-button");
    startButton.textContent = "START";
    startButton.style.boxShadow = "rgb(235, 235, 235) 0px 6px 0px";
    startButton.style.marginTop = "8px";
    startButton.style.marginBottom = "6px";
    startButton.onclick = startCountdown;
}