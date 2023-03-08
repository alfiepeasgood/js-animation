// variable for the spinning newspaper, which is the element furthest left on the page
const newspaperSpinning = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(2)' }
];


// does the timing for the spinning of the newspaper - how long until it does 1 full rotation
// these can be changed to play around with, increasing iterations will cause that many spins to happen
const newspaperTiming = {
  duration: 20000,
  iterations: 1,
}


// gets the newspaper element from the html
const newspaper = document.querySelector(".newspaper");

// gets the scroll element from the html
const scroll = document.querySelector(".scroll")

// checks if the newspaper element has been clicked
newspaper.addEventListener('click', () => {
  // if it has, then change the background colour to blue
  document.getElementById("paper").style.backgroundColor = "blue";
  // and run the animation code at the top of the page
  newspaper.animate(newspaperSpinning, newspaperTiming);

});


// code for the second element which changes when you scroll the page
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

// updates the box size based on the most recent scroll
function updateInfo() {
  console.log("up")
  txt = document.getElementById("scrollBox");
  style = window.getComputedStyle(txt, null).getPropertyValue("font-size");
  currentSize = parseFloat(style);
  txt.style.fontSize = (currentSize + 1) + "px";

}

// updates the box size based on the most recent scroll
function updateInfoDown() {
  console.log("down")
  txt = document.getElementById("scrollBox");
  style = window.getComputedStyle(txt, null).getPropertyValue("font-size");
  currentSize = parseFloat(style);
  txt.style.fontSize = (currentSize - 1) + "px";

}


// code for the animation of the green box which bounces for a period of time before eventually stopping
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



// the animation which runs when the page is loaded, cuases the letters to appear to fly down and rotate before stopping
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



// the animation for the traffic light animation which runs for ever
let trafficLight = anime.timeline({
  duration: 1000,
  easing: 'easeInOutSine',
  direction: 'alternate',
  loop: true
});

// gives each traffic light element the animation attributes with different values, so that they toggle on and off in a sensical way
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


// the selection of every letter on the page
var textEl = document.querySelectorAll(".letter")

// when a letter is hovered over, the animation for it is stopped amd the letter is enlarged
function animateText(el, scale, duration, elasticity){
  anime.remove(el);
  anime({
    targets: el,
    scale: scale,
    duration: duration,
    elasticity: elasticity
  });
}


// runs the above code when cursor hovers over a letter
function enterText(el){
  animateText(el,1.5,100,400)
};


// runs the above code with different passed variables when cursor leaves a letter
function leaveText(el){
  animateText(el,1,5000,300)
};

// for loop which runs through all letters and checks for when they are hovered / unhovered
for (var i = 0; i < textEl.length; i++){
  textEl[i].addEventListener("mouseenter",function(e){
    enterText(e.target);
  }, false);
  textEl[i].addEventListener("mouseleave",function(e){
    leaveText(e.target)
  }, false);
}
