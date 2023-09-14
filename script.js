//HTML elements
let start = document.getElementById("start");
let reset = document.getElementById("reset");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let indicator = document.getElementById("indicator");

let test = document.getElementById("test");

//Other variable
let mode = 0;
let time;

function timer(){
    seconds.textContent = parseInt(seconds.textContent) - 1;
}

test.addEventListener('click', () => {
    seconds.textContent = 59;
    time = setInterval(timer, 1000);
    console.log(time);
    if(parseInt(seconds.textContent) == 55){
        clearInterval(time);
    }
})

start.addEventListener('click', () => {
    mode = 1;
    minutes.textContent = 24;
    seconds.textContent = 59;
    reset.style.display = 'block';
    start.style.display = 'none';

    console.log(minutes.textContent);
    console.log(seconds.textContent);

    time = setInterval(timer, 1000);
    console.log(time);

    // while(parseInt(minutes.textContent) > 0){
        if(seconds.textContent == 55){
            minutes.textContent = parseInt(minutes.textContent) - 1;
            seconds.textContent = 59;
        }
    // }

    if(minutes.textContent == 0 && seconds.textContent == 0){
        minutes.textContent = "00";
        seconds.textContent = "00";
        clearInterval(time);
        return;
    }
})

reset.addEventListener('click', () => {
    mode = 0;
    minutes.textContent = 25;
    seconds.textContent = "00";
    reset.style.display = 'none';
    start.style.display = 'block';
})