

// let time = {
//     countMilliSec: 0,
//     countSeconds: 0,
//     countMinutes: 0
// };
let time = JSON.parse(localStorage.getItem('time')) || {
    countMilliSec: 0,
    countSeconds: 0,
    countMinutes: 0,
    countHours: 0
};


let isStartTimer = false;
let milliSecID;

// let countMilliSec = 0;
// let countSeconds = 0;
// let countMinutes = 0;

function stopInterval () {
    const buttonElem = document.querySelector('.js-start-btn');
    if (buttonElem.innerHTML === `<i class="fa-solid fa-pause"></i>`) {
        buttonElem.innerText = `<i class="fa-solid fa-play"></i>`;
        startPause();
    }
    pauseInterval();
}
function pauseInterval () {


    clearInterval(milliSecID);
}
function startPause() {
    const buttonElem = document.querySelector('.js-start-btn');

    if (!isStartTimer && buttonElem.innerHTML === `<i class="fa-solid fa-play"></i>`) {
        startTimer();
        isStartTimer = true;

        buttonElem.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        buttonElem.classList.add('pause-btn');
    } else {
        pauseInterval();
        isStartTimer = false;

        buttonElem.innerHTML = `<i class="fa-solid fa-play"></i>`;
        buttonElem.classList.remove('pause-btn')
    }
}

function startTimer() {

    milliSecID = setInterval( () => {
        time.countMilliSec++;

        if (time.countMilliSec === 99) {
            time.countMilliSec = 0;
            time.countSeconds++;
        }

        if (time.countSeconds === 60) {
            time.countSeconds = 0;
            time.countMinutes++;
        }

        if (time.countMinutes === 60) {
            time.countMinutes = 0;
            time.countHours++;
        }

        localStorage.setItem('time', JSON.stringify(time));

        time.countMilliSec = time.countMilliSec.toString().padStart(2, '0');

        time.countSeconds = time.countSeconds.toString().padStart(2, '0');

        time.countMinutes = time.countMinutes.toString().padStart(2, '0');

        time.countHours = time.countHours.toString().padStart(2, '0');

        renderTimer();

    }, 10);

}

function stopTimer() {
    time.countMilliSec = 0;
    time.countSeconds = 0;
    time.countMinutes = 0;
    time.countHours = 0;

    document.querySelector('.js-milli-sec')
        .innerText = '00';
    document.querySelector('.js-seconds')
        .innerText = ': 00';
    document.querySelector('.js-minutes')
        .innerText = ': 00';
    document.querySelector('.js-hours')
        .innerText = '00 ';

    stopInterval ();
}

function renderTimer() {
    document.querySelector('.js-milli-sec')
        .innerText = `${time.countMilliSec}`;
    document.querySelector('.js-seconds')
        .innerText = `: ${time.countSeconds}`;
    document.querySelector('.js-minutes')
        .innerText = `: ${time.countMinutes}`;
    document.querySelector('.js-hours')
        .innerText = `${time.countHours} `
}
