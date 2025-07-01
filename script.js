let startTime, updatedTime, difference, timerInterval;
let running = false;
let laps = [];

function updateDisplay(time) {
  const date = new Date(time);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  document.getElementById('display').textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      updateDisplay(difference);
    }, 10);
    running = true;
  }
}

function pause() {
  clearInterval(timerInterval);
  running = false;
}

function reset() {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  updateDisplay(0);
  document.getElementById('laps').innerHTML = '';
  laps = [];
}

function lap() {
  if (running) {
    laps.push(difference);
    const lapTime = document.createElement('li');
    lapTime.textContent = document.getElementById('display').textContent;
    document.getElementById('laps').appendChild(lapTime);
  }
}
