var countdownIntervalID = null;
var timeLeft = 25 * 60;

function countdown() {
    timeLeft -= 1;

    var timerText = document.getElementById('timer-text');

    var minutes = parseInt(timeLeft / 60);
    var seconds = timeLeft % 60;

    timerText.textContent = `${minutes}:${seconds}`
}

setInterval(countdown, 1000);