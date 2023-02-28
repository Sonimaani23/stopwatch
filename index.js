
const displayEl = document.querySelector('.display');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const resetBtn = document.querySelector('#reset');
const castBtn = document.querySelector('#cast');
const castListEl = document.querySelector('#cast-list');

let startTime;
let elapsedTime = 0;
let timerIntervalId;
let castIndex = 1;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}

function updateDisplay() {
  const currentTime = Date.now();
  const elapsedTimeSinceStart = currentTime - startTime + elapsedTime;
  displayEl.textContent = formatTime(elapsedTimeSinceStart);
}

function startTimer() {
  startTime = Date.now();
  timerIntervalId = setInterval(updateDisplay, 10);
}

function pauseTimer() {
  clearInterval(timerIntervalId);
  elapsedTime += Date.now() - startTime;
}

function resetTimer() {
  clearInterval(timerIntervalId);
  elapsedTime = 0;
  displayEl.textContent = formatTime(0);
  castListEl.innerHTML = '';
  castIndex = 1;
}

function castTime() {
  const castTime = formatTime(Date.now() - startTime + elapsedTime);
  const castItem = document.createElement('li');
  castItem.textContent = `CAST ${castIndex++} - ${castTime}`;
  castListEl.appendChild(castItem);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
castBtn.addEventListener('click', castTime);
