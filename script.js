const newspaperSpinning = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(2)' }
];



const newspaperTiming = {
  duration: 20000,
  iterations: 1,
}

const newspaper = document.querySelector(".newspaper");
const scroll = document.querySelector(".scroll")
newspaper.addEventListener('click', () => {
  document.getElementById("paper").style.backgroundColor = "blue";
  newspaper.animate(newspaperSpinning, newspaperTiming);

});

let oldScrollY = window.scrollY;
document.addEventListener('scroll', () => {

  if (oldScrollY < window.scrollY) {
    updateInfoDown()
    oldScrollY = window.scrollY
    console.log(oldScrollY)

  } else {
    updateInfo()
    oldScrollY = window.scrollY
    console.log(oldScrollY)
  }

});


function updateInfo() {
  console.log("up")
  txt = document.getElementById("scrollBox");
  style = window.getComputedStyle(txt, null).getPropertyValue("font-size");
  currentSize = parseFloat(style);
  txt.style.fontSize = (currentSize + 1) + "px";

}

function updateInfoDown() {
  console.log("down")
  txt = document.getElementById("scrollBox");
  style = window.getComputedStyle(txt, null).getPropertyValue("font-size");
  currentSize = parseFloat(style);
  txt.style.fontSize = (currentSize - 1) + "px";

}

let myAnimation = anime({
  targets: '.box',
  translateY: -150,
  borderRadius: 50,
  duration: 2000,
  easing: 'spring(7,100,1,0)',
  direction: 'alternate',
  rotate: {
    value: 360,
    duration: 2000,
    easing: 'easeInExpo'
  }
});

let animationTwo = anime({
  targets: '.letter',
  opacity: 1,
  translateY: 50,
  rotate: {
    value: 360,
    duration: 2000,
    easing: 'easeInExpo'
  },
  scale: anime.stagger([0.7, 1], { from: 'center' }),
  delay: anime.stagger(100, { start: 1000 }),
  translateX: [-10, 30]
});


let trafficLight = anime.timeline({
  duration: 1000,
  easing: 'easeInOutSine',
  direction: 'alternate',
  loop: true
});

trafficLight.add({
  targets: '.one',
  translateY: -50,
  backgroundColor: 'rgb(255,0,0)'
}).add({
  targets: '.two',
  translateY: -50,
  backgroundColor: 'rgb(255,255,0)'
}).add({
  targets: '.three',
  translateY: -50,
  backgroundColor: 'rgb(0,255,0)'
});

var textEl = document.querySelectorAll(".letter")

function animateText(el, scale, duration, elasticity){
  anime.remove(el);
  anime({
    targets: el,
    scale: scale,
    duration: duration,
    elasticity: elasticity
  });
}

function enterText(el){
  animateText(el,1.5,100,400)
};
function leaveText(el){
  animateText(el,1,5000,300)
};
for (var i = 0; i < textEl.length; i++){
  textEl[i].addEventListener("mouseenter",function(e){
    enterText(e.target);
  }, false);
  textEl[i].addEventListener("mouseleave",function(e){
    leaveText(e.target)
  }, false);
}