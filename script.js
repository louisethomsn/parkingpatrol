//point
let point;
console.log("point");

//liv
let liv;
console.log("liv");

//random
let myRand;

const vagt1 = document.querySelector("#vagt_container1");
const vagt2 = document.querySelector("#vagt_container2");
const lillepige1 = document.querySelector("#lillepige_container");
const gammeldame1 = document.querySelector("#gammeldame_container");

//Siden vises
window.addEventListener("load", sidenVises);

function windowResize() {
  console.log("windowResize");
  let widthScreen = document.querySelector("#screen").clientWidth;
  let myFontInProcent = 5;
  let myFont = (widthScreen / 350) * myFontInProcent;
  document.querySelector("#score_board").style.fontSize = myFont + "px";
}

function sidenVises() {
  console.log(this);
  window.addEventListener("resize", windowResize);
  windowResize();

  document.querySelector("#game_over").classList.add("fjernet");
  document.querySelector("#level_complete").classList.add("fjernet");
  document.querySelector("#lydfra").classList.add("fjernet");

  //Vis start skærm
  document.querySelector("#start").classList.remove("fjernet");
  document.querySelector("#lydtil").classList.remove("fjernet");

  //Klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", howToplay);

  //Klik på start_knap
  document.querySelector("#lydtil").addEventListener("click", lydFra);

  //baggrundsmusik starter
  document.querySelector("#sound_mix").play();
  document.querySelector("#sound_mix").loop = true;

  //pauser baggrundslyd
  document.querySelector("#sound_parkering").pause();
}

function lydTil() {
  console.log("lydTil");
}

function lydFra() {
  console.log("lydFra");

  document.querySelector("#lydtil").classList.add("fjernet");

  //Vis start skærm
  document.querySelector("#lydfra").classList.remove("fjernet");

  //pauser lyd
  document.querySelector("#sound_mix").pause();

  //baggrundslyde til
  document.querySelector("#sound_parkering").play();
  document.querySelector("#sound_parkering").loop = true;

  //lytter efter klik på lyd
  document.querySelector("#lydfra").addEventListener("click", sidenVises);
}

function howToplay() {
  console.log("howToplay");
  document.querySelector("#game_over").classList.add("fjernet");
  document.querySelector("#level_complete").classList.add("fjernet");
  document.querySelector("#start").classList.add("fjernet");

  //Vis regler
  document.querySelector("#regler").classList.remove("fjernet");
  //Klik på start_knap
  document.querySelector("#play").addEventListener("click", startGame);
}

function startGame() {
  console.log(this);
  //skjuler skærme
  document.querySelector("#game_over").classList.add("fjernet");
  document.querySelector("#level_complete").classList.add("fjernet");
  document.querySelector("#start").classList.add("fjernet");
  document.querySelector("#regler").classList.add("fjernet");

  document.querySelector("#screen").classList.remove("fjernet");
  //starter med 0 point
  point = 0;
  document.querySelector("#score_board").textContent = point;

  //starter med tre liv
  liv = 3;

  //vis alle liv
  document.querySelector("#liv1").classList.remove("fjernet");
  document.querySelector("#liv2").classList.remove("fjernet");
  document.querySelector("#liv3").classList.remove("fjernet");

  //starter tiden og sætter timer på
  document.querySelector("#time_board").classList.add("time");
  document
    .querySelector("#time_board")
    .addEventListener("animationend", stopSpillet);

  //containers får og position
  vagt1.classList.add("posvagt");
  vagt2.classList.add("posvagt");

  lillepige1.classList.add("poslillepige");
  gammeldame1.classList.add("posgammeldame");

  //start random vagt animation

  myRand = Math.floor(Math.random() * 3) + 1;
  vagt1.classList.add("speed" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  vagt1.classList.add("vagt" + myRand);
  vagt1.classList.add("delay" + myRand);

  myRand = Math.floor(Math.random() * 3) + 1;
  vagt2.classList.add("speed" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  vagt2.classList.add("vagt" + myRand);
  vagt2.classList.add("delay" + myRand);

  //start random lille pige animation + position
  myRand = Math.floor(Math.random() * 3) + 1;
  lillepige1.classList.add("lillepige" + myRand);
  gammeldame1.classList.add("gammeldame" + myRand);

  //klik på vagt
  vagt1.addEventListener("click", clickVagt);
  vagt2.addEventListener("click", clickVagt);

  //vagt loop
  vagt1.addEventListener("animationiteration", vagtLoop);
  vagt2.addEventListener("animationiteration", vagtLoop);

  //klik på lillepige
  lillepige1.addEventListener("click", clickLillepige);
  gammeldame1.addEventListener("click", clickGammeldame);

  //lillepige loop
  lillepige1.addEventListener("animationiteration", lillepigeLoop);
  gammeldame1.addEventListener("animationiteration", gammeldameLoop);
}

//Vagt starter animation når man klikker

function clickVagt() {
  console.log("clickVagt");
  console.log(this);

  //man får et point
  point++;
  document.querySelector("#score_board").textContent = point;

  //starter drej animationer på vagt
  this.classList.add("frys");
  this.firstElementChild.classList.add("drej");

  //så man ikke kan klikke igen
  this.removeEventListener("click", clickVagt);
  //Lytter efter animation færdig
  this.addEventListener("animationend", vagtReset);

  //lydeffekt
  document.querySelector("#sound_vagt").play();
  document.querySelector("#sound_vagt").currentTime = 0;
}

//vagt animation starter forfra når drej animation er færdig

function vagtReset() {
  // console.log("vagtReset");
  //fjerner alle animationer
  this.classList = "";
  this.firstElementChild.classList = "";

  //genstarter
  this.offsetLeft;
  this.firstElementChild.offsetLeft;

  //vis vagt animation igen + position
  this.classList.add("posvagt");
  myRand = Math.floor(Math.random() * 3) + 1;
  this.classList.add("speed" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  this.classList.add("vagt" + myRand);
  this.classList.add("delay" + myRand);

  //lyt efter klik
  this.addEventListener("click", clickVagt);
}

//vagt animation looper

function vagtLoop() {
  console.log("vagtLoop");
  console.log(this);

  //mister et liv

  document.querySelector("#liv" + liv).classList.add("fjernet");
  liv--;

  //fjerner animation
  this.classList = "";
  this.firstElementChild.classList = "";

  //genstarter
  this.offsetLeft;
  this.firstElementChild.offsetLeft;

  //ny random path
  this.classList.add("posvagt");
  myRand = Math.floor(Math.random() * 3) + 1;
  this.classList.add("speed" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  this.classList.add("vagt" + myRand);
  this.classList.add("delay" + myRand);

  //vis antal liv
  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}

//Lille pige forsvinder når man klikker på hende

function clickLillepige() {
  console.log("clickLillepige");

  //mister et liv
  document.querySelector("#liv" + liv).classList.add("fjernet");
  liv--;

  //starter forsvind animation
  lillepige1.classList.add("frys");
  document.querySelector("#lillepige_sprite").classList.add("forsvind");

  //Lytter efter animation færdig

  document
    .querySelector("#lillepige_sprite")
    .addEventListener("animationend", lillepigeReset);

  lillepige1.removeEventListener("click", clickLillepige);

  //lydeffekt
  document.querySelector("#sound_pige").play();

  //vis antal liv
  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}

//Lille pige starter forfra når forsvind animation er færdig

function lillepigeReset() {
  console.log("lillepigeReset");

  //fjerner alle animationer
  lillepige1.classList = "";
  document.querySelector("#lillepige_sprite").classList = "";

  lillepige1.offsetLeft;
  document.querySelector("#lillepige_sprite").offsetLeft;
  //tilføjer ny tilfældig path
  lillepige1.classList.add("poslillepige");
  myRand = Math.floor(Math.random() * 3) + 1;
  lillepige1.classList.add("lillepige" + myRand);

  //lytter efter klik
  lillepige1.addEventListener("click", clickLillepige);
}

//Lille pige looper

function lillepigeLoop() {
  console.log("lillepigeLoop");

  //fjerner alle animationer
  lillepige1.classList = "";
  lillepige1.offsetLeft;

  //tilføjer ny tilfældig path
  lillepige1.classList.add("poslillepige");
  myRand = Math.floor(Math.random() * 3) + 1;
  lillepige1.classList.add("lillepige" + myRand);

  //lytter efter klik
  lillepige1.addEventListener("click", clickLillepige);

  //vis antal liv
  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}

//Gammel dame forsvinder når man klikker på hende

function clickGammeldame() {
  console.log("clickGammeldame");

  //mister et liv
  document.querySelector("#liv" + liv).classList.add("fjernet");
  liv--;

  //starter forsvind animation
  gammeldame1.classList.add("frys");
  document.querySelector("#gammeldame_sprite").classList.add("forsvind");

  //Lytter efter animation færdig

  document
    .querySelector("#gammeldame_sprite")
    .addEventListener("animationend", gammeldameReset);

  gammeldame1.removeEventListener("click", clickGammeldame);

  //lydeffekt
  document.querySelector("#sound_dame").play();

  //vis antal liv
  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}

//Gammel dame starter forfra når forsvind animation er færdig

function gammeldameReset() {
  console.log("gammeldameReset");

  //fjerner alle animationer
  gammeldame1.classList = "";
  document.querySelector("#gammeldame_sprite").classList = "";

  gammeldame1.offsetLeft;
  document.querySelector("#gammeldame_sprite").offsetLeft;
  //tilføjer ny tilfældig path
  gammeldame1.classList.add("posgammeldame");
  myRand = Math.floor(Math.random() * 3) + 1;
  gammeldame1.classList.add("gammeldame" + myRand);

  //lytter efter klik
  gammeldame1.addEventListener("click", clickGammeldame);
}

//Gammel dame looper

function gammeldameLoop() {
  console.log("gammeldameLoop");

  //fjerner alle animationer
  gammeldame1.classList = "";
  gammeldame1.offsetLeft;

  //tilføjer ny tilfældig path
  gammeldame1.classList.add("posgammeldame");

  myRand = Math.floor(Math.random() * 3) + 1;
  gammeldame1.classList.add("gammeldame" + myRand);

  //lytter efter klik
  gammeldame1.addEventListener("click", clickGammeldame);

  //vis antal liv
  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}

function stopSpillet() {
  console.log("stopSpillet");

  //fjerner tid
  document.querySelector("#time_board").classList.remove("time");
  document
    .querySelector("#time_board")
    .removeEventListener("animationend", stopSpillet);

  // fjerner alle elementer på containere og sprites
  vagt1.classList = "";
  document.querySelector("#vagt_sprite1").classList = "";
  vagt2.classList = "";
  document.querySelector("#vagt_sprite2").classList = "";

  lillepige1.classList = "";
  document.querySelector("#lillepige_sprite").classList = "";

  gammeldame1.classList = "";
  document.querySelector("#gammeldame_sprite").classList = "";

  // fjerner alle event listeners

  // vagt1.removeEventListener("click", clickVagt);

  // vagt1.removeEventListener("animationiteration", vagtLoop);

  this.removeEventListener("click", clickVagt);

  this.removeEventListener("animationiteration", vagtLoop);

  this.removeEventListener("animationend", vagtReset);

  lillepige1.removeEventListener("click", clickLillepige);

  lillepige1.removeEventListener("animationiteration", lillepigeLoop);

  document
    .querySelector("#lillepige_sprite")
    .removeEventListener("animationend", lillepigeReset);

  gammeldame1.removeEventListener("click", clickGammeldame);

  gammeldame1.removeEventListener("animationiteration", gammeldameLoop);

  document
    .querySelector("#gammeldame_sprite")
    .removeEventListener("animationend", gammeldameReset);

  if (point >= 8) {
    console.log("levelComplete");
    levelComplete();
  } else {
    console.log("gameOver");
    gameOver();
  }
}

function gameOver() {
  console.log("gameOver");

  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("fjernet");

  //Vis point
  document.querySelector("#point_antal").textContent = point;

  //genstart knap
  document.querySelector("#genstart1").addEventListener("click", startGame);
}

function levelComplete() {
  console.log("levelComplete");

  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("fjernet");

  //Vis point
  document.querySelector("#point_antal2").textContent = point;

  //genstart knap
  document.querySelector("#genstart2").addEventListener("click", startGame);
}
