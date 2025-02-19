function scroll_header() {
    const nav = document.getElementById("main-nav");
    if (window.pageYOffset >= 80) {
        nav.classList.add('scroll-header');
    }
    else {
        nav.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scroll_header);


/*===========================================================OVERVIEW AND MILESTONE SECTION===============================================*/
let valueDisplays = document.querySelectorAll('.num');
let interval = 5000;

valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute('data-val'));
    console.log(endValue);
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;
        if (startValue == endValue) {
            clearInterval(counter);
        }
    }, duration)
});

/*============================================================TIMELINE section======================================================================*/
function qs(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}
  
const sections = qs('.line_section', true);
const timeline = qs('.timeline');
const line = qs('.line');
line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * .8;
  
function scrollHandler(e) {
    const {
      scrollY
    } = window;
    up = scrollY < prevScrollY;
    down = !up;
    const timelineRect = timeline.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect(); // const lineHeight = lineRect.bottom - lineRect.top;
  
    const dist = targetY - timelineRect.top;
    console.log(dist);
  
    if (down && !full) {
      set = Math.max(set, dist);
      line.style.bottom = `calc(100% - ${set}px)`;
    }
  
    if (dist > timeline.offsetHeight + 50 && !full) {
      full = true;
      line.style.bottom = `-50px`;
    }
  
    sections.forEach(item => {
      // console.log(item);
        const rect = item.getBoundingClientRect(); //     console.log(rect);
  
        if (rect.top + item.offsetHeight / 5 < targetY) {
            item.classList.add('show-me');
        }
    }); // console.log(up, down);
  
    prevScrollY = window.scrollY;
}
 
scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll', scrollHandler);

let days = document.getElementById('days');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');

let dd = document.getElementById('dd');
let hh = document.getElementById('hh');
let mm = document.getElementById('mm');
let ss = document.getElementById('ss');

let daydot = document.querySelector('.day_dot');
let hr_dot = document.querySelector('.hr_dot');
let min_dot = document.querySelector('.min_dot');
let sec_dot = document.querySelector('.sec_dot');

let endDate = '04/10/2025, 00:00:00';
// date format: mm/dd/yy

let x = setInterval(function () {
    let countdown = new Date(endDate).getTime();
    let now = new Date().getTime();
    let distance = countdown - now;

    // time calculation for days, hours, minutes and seconds'
    let d = Math.floor(distance / (1000 * 60 * 60 * 24))
    let h = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    let m = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60))
    let s = Math.floor(distance % (1000 * 60) / (1000))

    // output the result in element with id
    days.innerHTML = d + "<br><span>Days</span>";
    hours.innerHTML = h + "<br><span>Hours</span>";
    minutes.innerHTML = m + "<br><span>Minutes</span>";
    seconds.innerHTML = s + "<br><span>Seconds</span>";

    // animate stroke
    dd.style.strokeDashoffset = 440 - (440 * d) / 365;
    hh.style.strokeDashoffset = 440 - (440 * h) / 24;
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;

    // animate circle dots
    daydot.style.transform = `rotateZ(${d * 0.986}deg)`;
    hr_dot.style.transform = `rotateZ(${h * 15}deg)`;
    min_dot.style.transform = `rotateZ(${m * 6}deg)`;
    sec_dot.style.transform = `rotateZ(${s * 6}deg)`;
});

/*============================================================TIMELINE END======================================================================*/

if(screen.width<500){
    var radius = 360;
}
else{
    var radius = 360;

}
var autoRotate = true;
var rotateSpeed = -90;
var imgWidth = 190;
var imgHeight = 230;

setTimeout(init, 1000);

var odrag = document.getElementById('drag');
var ospin = document.getElementById('spin');
var aImg = document.getElementsByClassName('image');
var aEle = [...aImg];
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

var container = document.getElementsByClassName('hostnpartners');



function init(delayTime) {
    for (let i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = "rotateY("
            + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
    }
    odrag.style.transform = "rotateX(0deg)";
}

function applyTransform(obj) {
    if (tY > 0) tY = 0;
    if (tY < 0) tY = 0;
    obj.style.transform = "rotateX("
        + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
    ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 0;

if (autoRotate) {
    var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

document.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    var sX = e.clientX,
        sY = e.clientY;


    this.onpointermove = function (e) {
        e = e || window.event;
        var nX = e.clientX,
            nY = e.clientY;

        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;

        applyTransform(odrag);
        sX = nX;
        sY = nY;
    };

    this.onpointerup = function (e) {
        odrag.timer = setInterval(function () {
            desX *= 0.99;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;

            applyTransform(odrag);
            playSpin(false);


            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }

        }, 17);

        this.onpointermove = this.onpointerup = null;
    };

    return false;
}

/*============================================================ FOOTER ======================================================================*/
// Make the icon glow when hover the footer text
const tnc = document.getElementById('tnc');
const doc_icon = document.getElementById('doc-icon');
const flw_us = document.getElementById('flw-us');
const social_icon = document.getElementById('social-icon');

tnc.addEventListener('mouseover', () => {
    doc_icon.classList.add('icon-glow');
});
flw_us.addEventListener('mouseover', () => {
    social_icon.classList.add('icon-glow');
});

tnc.addEventListener('mouseout', () => {
    doc_icon.classList.remove('icon-glow');
});
flw_us.addEventListener('mouseout', () => {
    social_icon.classList.remove('icon-glow');
});

function scrollTop(){
    const scrollY = window.pageYOffset
    const nav = document.getElementsByClassName('um_header')
    if(scrollY >= 80){
        nav.classList.add('header_transparent')
    }
    else{
        nav.classList.remove('header_transparent')
    }
}
window.addEventListener('scroll',scrollTop)



/*============================================================ ??? ======================================================================*/
var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
};
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
var konamiCodePosition = 0;
document.addEventListener('keydown', function (e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];
    if (key == requiredKey) {
        konamiCodePosition++;
        if (konamiCodePosition == konamiCode.length) {
            activated();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});
function activated() {
    alert("You activated the easter egg!");
    window.location.href = "./assets/index2.html"
}
