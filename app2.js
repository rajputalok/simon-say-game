let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];
let started = false;
let level =0;
let HighScore =0;

let h2 = document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game is started");
        started = true;
        levelup();
    }
});

function gameFlash(btn){
    btn.classList.add("change");
    setTimeout(function(){
        btn.classList.remove("change");
    },250);
}
function userFlash(btn){
    btn.classList.add("changegreen");
    setTimeout(function(){
        btn.classList.remove("changegreen");
    },250);
}


function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randomIdx=Math.floor(Math.random()*3);
    let randomcol=btns[randomIdx];
    let randombtn=document.querySelector(`.${randomcol}`);
    gameSeq.push(randomcol);
    gameFlash(randombtn);
}
function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
           setTimeout(levelup,1000);
        }
    }else{
        if(HighScore < level){
            HighScore = level;
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Your High Score : ${HighScore}. <br>Press any key to start`;
        let body = document.querySelector("body");
        body.classList.add("danger");
        setTimeout(() => {
            body.classList.remove("danger")
        },250);
        reset();
    }
}
function btnpress(){
    let btn = this;
    userFlash(btn);

    usercol = btn.getAttribute("id");
    userSeq.push(usercol);
    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}