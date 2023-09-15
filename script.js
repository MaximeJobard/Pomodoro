//HTML elements
let start = document.getElementById("start");
let reset = document.getElementById("reset");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let indicator = document.getElementById("indicator");

function timer(){
    if(parseInt(seconds.textContent) == 0){
        if(parseInt(minutes.textContent) > 0){
            minutes.textContent = parseInt(minutes.textContent) - 1;
            seconds.textContent = 60;
        }
        else{
            if(indicator.textContent == "Phase : Working"){
                minutes.textContent = 5;
                seconds.textContent = "0";

                document.body.style.backgroundColor = 'green';
                indicator.textContent = "Phase : Break";
            }
            else{
                minutes.textContent = 25;
                seconds.textContent = "0";
                document.body.style.backgroundColor = 'red';
                indicator.textContent = "Phase : Working";
            }
        }
    }

    if(parseInt(seconds.textContent) > 0){
        seconds.textContent = parseInt(seconds.textContent) - 1;
    }

    if(parseInt(seconds.textContent) < 10){
        seconds.textContent = "0" + seconds.textContent;
    }

    if(parseInt(minutes.textContent) < 10){
        minutes.textContent = "0" + parseInt(minutes.textContent);
    }
}

start.addEventListener('click', () => {
    console.log(parseInt(seconds.textContent));
    reset.style.display = 'block';
    start.style.display = 'none';

    console.log(minutes.textContent);
    console.log(seconds.textContent);

    const time = setInterval(timer, 1000);
    console.log(time);
})

reset.addEventListener('click', () => {
    window.location.reload();
})