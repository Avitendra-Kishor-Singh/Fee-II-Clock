let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

startButton.addEventListener("click", () => {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

lapButton.addEventListener("click", () => {
    if (isRunning) {
        addLap();
    } else {
        resetTimer();
    }
});

function startTimer() {
    isRunning = true;
    startButton.textContent = "Stop";
    startButton.style.backgroundColor = "red";
    lapButton.textContent = "Lap";
    lapButton.disabled = false;
    timerInterval = setInterval(updateDisplay, 10);
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startButton.textContent = "Start";
    startButton.style.backgroundColor = "green";
    lapButton.textContent = "Reset";
}

function resetTimer() {
    clearInterval(timerInterval); 
    elapsedTime = 0; 
    display.textContent = "00:00:00"; 
    lapButton.disabled = true; 
    lapsList.innerHTML = ''; 
    isRunning = false; 
    startButton.textContent = "Start"; 
    startButton.style.backgroundColor = "green"; 
}

function updateDisplay() {
    elapsedTime += 10;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    
    display.textContent = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function addLap() {
    const lapTime = display.textContent;
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapsList.prepend(lapItem);
}