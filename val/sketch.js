"use strict"; //catch some common coding errors

let hearts = [];

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0,0);
    canvas.style("z-index", "-1"); //hearts stay behind everything
    canvas.style("position", "fixed");
    //array of 30 hearts
    for(let i = 0; i < 20; i++) {
        hearts.push(new Heart());
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

class Heart {
    constructor() {
        this.x = random(width);
        this.y = random(-height, 0);
        this.speed = random(1,3);
        this.size = random(30,60);
    }
    //method to make heart fall
    fall() {
        this.y += this.speed;
        if (this.y > height + 40) {
            this.y = random(-100, 0);
            this.x = random(width);
        }
    }
    display() {
        textSize(this.size);
        text("❤️", this.x, this.y);
    }
}

function draw() {
    clear();
    //for each heart in array hearts call methods
    for(let heart of hearts) {
        heart.fall();
        heart.display();
    }
}

//read input as all lowercase and check name, proceed
document.getElementById("enterButton").addEventListener("click", function() {
    var nameInput = document.getElementById("nameInput").value;
    nameInput = nameInput.trim().toLowerCase();

    if(nameInput === "avy") {
        document.getElementById("namePrompt").style.display = "none";
        document.getElementById("valentineScreen").style.display = "block";

        document.getElementById("welcomeText").textContent 
        = "WELCOME " + nameInput.toUpperCase() + "<3";
    
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
});

//yes/no buttons / valentine question screen
let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let yesButtonSize = 16; //default font size

yesButton.addEventListener("click", function() {
    alert("YIPPEEEEE!!"); 
    document.getElementById("valentineScreen").style.display = "none";
    document.getElementById("envelopeScreen").style.display = "block";
    let music = document.getElementById("bgMusic");
    music.volume = 0.3;
    music.play();
});
noButton.addEventListener("click", function() {
    yesButtonSize+= 10;
    yesButton.style.fontSize = yesButtonSize + "px";

    //set to move no button randomly within constraints
    let randomX = Math.random() * (window.innerWidth - 100);
    let randomY = Math.random() * (window.innerHeight - 50);

    noButton.style.position = "absolute";
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
});

let letter = document.getElementById("letter");
let envelope = document.getElementById("envelope");
envelope.addEventListener("click", function() {
    document.querySelector(".flap").style.transform = "rotateX(180deg)";
    document.querySelector(".letter").style.height = "200px";
    document.getElementById("heartStamp").style.display= "none";
});