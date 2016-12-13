"use strict";

function Clock() {
  var clockON = true;
  var timerID = 0;
  
  function getTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
  }

  function renew() {
    document.querySelector('#clock').innerHTML = getTime();
  }
  
  function start() {
    timerID = setInterval(renew, 1000);
    clockON = true;
  };

  function stop() {
    clearInterval(timerID);
    clockON = false;
  };
  
  document.querySelector('#clock').onclick = toggle;
  function toggle() {
    if (clockON) {
      alert('Time stopped at: ' + this.innerHTML);
      stop();
    }
    else {
      alert('Time started');
      start();
    }
  };

  this.start = start;
  this.stop = stop;
}

function Voter() {
  
  document.querySelector('#voter').onclick = setVote;
  function setVote(e) {
    var vote = parseInt(document.querySelector('.vote').innerHTML);
    if (e.target.className == 'down') vote -= 1;
    if (e.target.className == 'up') vote += 1;
    document.querySelector('.vote').innerHTML = vote;
  }
    
  this.setVote = setVote;
}

function Canvas() {
  
  var context = document.querySelector('#canvas').getContext('2d');
  if (!context) {
    alert('Скачай нормальный браузер');
  }

  function draw() {
    context.strokeStyle = '#f00';
    context.fillStyle = '#ff0';
    context.lineWidth   = 4;
    context.beginPath();
    context.arc(150, 150, 100, 0, 2*Math.PI, true);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.arc(110, 110, 15, 0, 2*Math.PI, true);					
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(190, 110, 15, 0, 2*Math.PI, true);
    context.fill();
    context.closePath();
    context.beginPath();
    context.moveTo(150, 120);
    context.lineTo(135, 180);
    context.lineTo(165, 180);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.arc(150, 150, 70, Math.PI, 2*Math.PI, true);
    context.stroke();
    context.closePath();
    context.strokeStyle = '#000';
    context.beginPath();
    var x = 0;
    var y = 0;
    for(var i = 0; i < 5; i++) {
      context.moveTo(80 + x, 85 + y);
      context.bezierCurveTo(60 + x, 60 + y, 120 + x, 40 + y, 100 + x, 0 + y);
      context.stroke();
      x += 15;
      y -= 5;
    }
    for(var i = 0; i < 5; i++) {
      context.moveTo(80 + x, 85 + y);
      context.bezierCurveTo(0 + x, 60 + y, 220 + x, 40 + y, 100 + x, 0 + y);
      context.stroke();
      x += 15;
      y += 5;
    }
    context.closePath();/* */
  }
  
  this.draw = draw;
}