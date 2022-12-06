"use strict";
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
const btnnew = document.querySelector(".btn--new");
const btnroll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

let totalscore, activeplayer, playing, currentscore;
const init = function () {
  totalscore = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceEl.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();
const switchplayer = function () {
  currentscore = 0;
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};
btnroll.addEventListener("click", function () {
  if (playing) {
    const diceno = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${diceno}.png`;

    if (diceno !== 1) {
      currentscore += diceno;
      console.log(currentscore);
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
      if (currentscore >= 20) {
        playing = false;
        totalscore[activeplayer] = document.getElementById(
          `score--${activeplayer}`
        ).textContent = totalscore[activeplayer] + currentscore;
        diceEl.classList.add("hidden");
        document
          .querySelector(`.player--${activeplayer}`)
          .classList.add("player--winner");
        document
          .querySelector(`.player--${activeplayer}`)
          .classList.remove("player--active");
      }
    } else {
      switchplayer();
    }
  }
});

btnhold.addEventListener("click", function () {
  if (playing) {
    totalscore[activeplayer] = document.getElementById(
      `score--${activeplayer}`
    ).textContent = totalscore[activeplayer] + currentscore;
    if (totalscore[activeplayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    } else {
      switchplayer();
    }
  }
});
btnnew.addEventListener("click", init);
