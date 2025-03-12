let gameSeq = [];
let userSeq = [];
let btnColor = ["red", "yellow", "green", "purple"];
let gameStart = false;
let h3 = document.querySelector("h3");
let level = 0;

document.addEventListener("keypress", function () {
    if (!gameStart) {
        console.log("🎮 Game started!");
        gameStart = true;
        level = 0;
        gameSeq = [];
        userSeq = [];
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() { 
    userSeq = [];
    level++;
    
    if (h3) {
        h3.innerText = 'Level ' + level;
    } else {
        console.log("⚠️ h3 element is missing!");
    }

    let randomIndx = Math.floor(Math.random() * btnColor.length);
    let randomColor = btnColor[randomIndx];
    gameSeq.push(randomColor);
    
    console.log(`🎯 Level ${level} - New Button: ${randomColor}`);
    console.log("Game Sequence:", gameSeq);

    let btn = document.querySelector("." + randomColor);
    gameFlash(btn);
}

function checkBtn() {
    let index = userSeq.length - 1;

    if (userSeq[index] === gameSeq[index]) {
        console.log("✅ Correct Sequence");

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        console.log("❌ Wrong Sequence! Game Over!");
        if (h3) {
            h3.innerText = '❌ Game Over! Press any key to restart.\nYour score '+level;
        }
        gameSeq = [];
        level=0;
        gameStart = false;
    }
}

function btnPress() {
    let btn = this;
    let btnName = btn.getAttribute("id");
    
    console.log("🖱️ Button Pressed:", btnName);
    userSeq.push(btnName);
    console.log("User Sequence:", userSeq);

    userFlash(btn);
    checkBtn();
}

let allBtn = document.querySelectorAll(".btn");
for (let btn of allBtn) {
    btn.addEventListener("click", btnPress);
}
