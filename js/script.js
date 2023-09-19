// Retrieving HTML elements
let start = document.getElementById("start"); // Start button
let reset = document.getElementById("reset"); // Reset button
let minutes = document.getElementById("minutes"); // Minutes display
let seconds = document.getElementById("seconds"); // Seconds display
let indicator = document.getElementById("indicator"); // Phase indicator (work or pause)
let setting = document.getElementById("setting"); // Settings button
let ok = document.getElementById("ok"); // Confirm settings button
let infoWork = document.getElementById("infoWork"); // Work duration information
let infoPause = document.getElementById("infoPause"); // Pause duration information
let minWork = document.getElementById("minWork"); // Work duration input field
let minPause = document.getElementById("minPause"); // Pause duration input field
let timerDisplay = document.querySelector(".timer"); // Timer display
let mode = document.querySelector(".mode"); // Mode display (work or pause)

let storage = localStorage;
let setWork = storage.getItem("setWork");
let setPause = storage.getItem("setPause");

// Initializing default values if parameters are not specified in the Local
if (storage.getItem("setWork") == null) {
    setWork = 25; // Default work duration of 25 minutes
    setPause = 5; // Default pause duration of 5 minutes
}

storage.setItem("setWork", setWork);
storage.setItem("setPause", setPause);

// Configuring initial display of minutes
if (parseInt(setWork) >= 10) {
    minutes.textContent = setWork; // Display work duration
} else {
    minutes.textContent = "0" + setWork; // Display work duration with leading "0" if less than 10
}

// Main timer function
function timer() {
    if (parseInt(seconds.textContent) == 0) {
        if (parseInt(minutes.textContent) > 0) {
            // Decrement minutes and reset seconds
            minutes.textContent = parseInt(minutes.textContent) - 1;
            seconds.textContent = 60;
        } else {
            if (indicator.textContent == "Phase : Working") {
                // Transition to pause phase
                minutes.textContent = setPause;
                seconds.textContent = "0";
                document.body.style.backgroundColor = 'green';
                timerDisplay.style.backgroundColor = "rgb(0, 150, 0)";
                mode.style.backgroundColor = "rgb(0, 150, 0)";
                indicator.textContent = "Phase : Break";
            } else {
                // Transition to work phase
                minutes.textContent = setWork;
                seconds.textContent = "0";
                document.body.style.backgroundColor = 'rgb(200, 0, 0)';
                timerDisplay.style.backgroundColor = "rgb(230, 0, 0)";
                mode.style.backgroundColor = "rgb(230, 0, 0)";
                indicator.textContent = "Phase : Working";
            }
        }
    }

    if (parseInt(seconds.textContent) > 0) {
        seconds.textContent = parseInt(seconds.textContent) - 1; // Decrement seconds
    }

    if (parseInt(seconds.textContent) < 10) {
        seconds.textContent = "0" + seconds.textContent; // Add leading "0" to seconds if less than 10
    }

    if (parseInt(minutes.textContent) < 10) {
        minutes.textContent = "0" + parseInt(minutes.textContent); // Add leading "0" to minutes if less than 10
    }
}

// Event listener to start the timer  
start.addEventListener('click', () => {
    reset.style.display = 'block';
    start.style.display = 'none';
    setting.style.display = 'none';
    setInterval(timer, 1000); // Call the timer function every second
});

// Event listener to reset the timer
reset.addEventListener('click', () => {
    if (confirm("Do you want to reset the timer?")) {
        window.location.reload(); // Reload the page to reset the timer
    }
});

// Event listener to open duration settings
setting.addEventListener('click', () => {
    start.style.display = 'none';
    setting.style.display = 'none';
    minWork.style.display = 'block';
    minPause.style.display = 'block';
    ok.style.display = 'block';
    infoWork.style.display = 'block';
    infoPause.style.display = 'block';
    minWork.setAttribute('value', setWork); // Display current work duration in the input field
    minPause.setAttribute('value', setPause); // Display current pause duration in the input field
});

// Event listener to confirm duration settings
ok.addEventListener('click', () => {
    if (minWork.value >= 1 && minPause.value >= 1) {
        start.style.display = 'block';
        setting.style.display = 'block';
        minWork.style.display = 'none';
        minPause.style.display = 'none';
        ok.style.display = 'none';
        infoWork.style.display = 'none';
        infoPause.style.display = 'none';

        setWork = parseInt(minWork.value); // Update the work duration
        setPause = parseInt(minPause.value); // Update the pause duration
        minutes.textContent = parseInt(minWork.value);

        if (parseInt(minWork.value) >= 10) {
            minutes.textContent = minWork.value; // Display the new work duration
        } else {
            minutes.textContent = "0" + minWork.value; // Display the new work duration with leading "0" if less than 10
        }

        localStorage.setItem("setWork", setWork);
        localStorage.setItem("setPause", setPause);

    } else {
        alert("Values must be positive");
    }
});