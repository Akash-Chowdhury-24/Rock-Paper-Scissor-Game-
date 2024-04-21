let points = JSON.parse(localStorage.getItem('points')) || {
  win: 0,
  loss: 0,
  tie: 0
};
score()

let ifPlaying = false;
let intervalID;
function autoPlay() {
  if (!ifPlaying) {
    intervalID = setInterval(function () {
      const c1 = systemmove();
      usermove(c1);
    }, 1000);
    ifPlaying = true;
  } else {
    clearInterval(intervalID);
    ifPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', function () {
  usermove('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', function () {
  usermove('paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', function () {
  usermove('scissor');
});

document.body.addEventListener('keydown', function (event) {
  if (event.key === 'r') {
    usermove('rock');
  } else if (event.key === 'p') {
    usermove('paper');
  } else if (event.key === 's') {
    usermove('scissor');
  }
});

document.querySelector('.js-restart-button').addEventListener('click', function () {
  points.win = 0;
  points.loss = 0;
  points.tie = 0;
  localStorage.removeItem('points');
  score();
});

document.querySelector('.js-auto-play').addEventListener('click', function () {
  autoPlay();
});


function usermove(button) {
  const c = systemmove();
  let result = '';
  if (button === 'scissor') {
    if (c === 'rock') {
      result = 'LOSS'
    }
    else if (c === 'paper') {
      result = 'WIN';
    }
    else if (c === 'scissor') {
      result = 'TIE';
    }
  }
  if (button === 'paper') {
    if (c === 'rock') {
      result = 'WIN'
    }
    else if (c === 'paper') {
      result = 'TIE';
    }
    else if (c === 'scissor') {
      result = 'LOSS';
    }
  }
  if (button === 'rock') {
    if (c === 'rock') {
      result = 'TIE'
    }
    else if (c === 'paper') {
      result = 'LOSS';
    }
    else if (c === 'scissor') {
      result = 'WIN';
    }
  }

  if (result === 'WIN') {
    points.win += 1;
  }
  else if (result === 'LOSS') {
    points.loss += 1;
  }
  else if (result === 'TIE') {
    points.tie += 1;
  }

  localStorage.setItem('points', JSON.stringify(points));
  document.querySelector('.js-display-move').innerHTML = `you: <img src="img/${button}-emoji.png" class="image"> || <img src="img/${c}-emoji.png" class="image">:System`;
  document.querySelector('.js-display-result').innerHTML = `${result}`;
  score();

}
function score() {
  document.querySelector('.js-display-score').innerHTML = `Win:${points.win}  loss:${points.loss}  tie:${points.tie}`;
}
function systemmove() {
  let a = Math.random();
  let c = '';

  if (a >= 0 && a < (1 / 3)) {
    c = 'rock';
  }
  else if (a >= (1 / 3) && a < (2 / 3)) {
    c = 'paper';
  }
  else if (a >= (2 / 3) && a < 1) {
    c = 'scissor';
  }
  return c;
}