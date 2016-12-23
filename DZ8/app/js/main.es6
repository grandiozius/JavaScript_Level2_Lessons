"use strict";

class Clock {
  constructor(elem) {
    elem.addEventListener('click', (e) => { this.toggle(e); });
    this.elem = elem;
    this.start;
    this.stop;
  }
  
  getTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    let time = hours + ':' + minutes + ':' + seconds;
    return time;
  }
  
  start() {
    this.timerID = setInterval(() => { this.elem.innerHTML = this.getTime(); }, 1000);
    this.clockON = true;
  }

  stop() {
    clearInterval(this.timerID);
    this.clockON = false;
  }
  
  toggle() {
    if (this.clockON) {
      alert('Time stopped at: ' + this.elem.innerHTML);
      this.stop();
    }
    else {
      alert('Time started');
      this.start();
    }
  }
}

class Voter {
  constructor(elem) {
    elem.addEventListener('click', (e) => { this.setVote(e); });
  }
  
  setVote(event) {
    let vote = parseInt(document.querySelector('.vote').innerHTML);
    if (event.target.className == 'down') vote -= 1;
    if (event.target.className == 'up') vote += 1;
    document.querySelector('.vote').innerHTML = vote;
  }
}

class Canvas {
  constructor(elem) {
    let context = elem.getContext('2d');
    if (!context) alert('Скачай нормальный браузер');
    this.context = context;
    this.draw;
  }

  draw() {
    this.context.strokeStyle = '#f00';
    this.context.fillStyle = '#ff0';
    this.context.lineWidth   = 4;
    this.context.beginPath();
    this.context.arc(150, 150, 100, 0, 2*Math.PI, true);
    this.context.stroke();
    this.context.closePath();
    this.context.beginPath();
    this.context.arc(110, 110, 15, 0, 2*Math.PI, true);					
    this.context.fill();
    this.context.closePath();
    this.context.beginPath();
    this.context.arc(190, 110, 15, 0, 2*Math.PI, true);
    this.context.fill();
    this.context.closePath();
    this.context.beginPath();
    this.context.moveTo(150, 120);
    this.context.lineTo(135, 180);
    this.context.lineTo(165, 180);
    this.context.stroke();
    this.context.closePath();
    this.context.beginPath();
    this.context.arc(150, 150, 70, Math.PI, 2*Math.PI, true);
    this.context.stroke();
    this.context.closePath();
    this.context.strokeStyle = '#000';
    this.context.beginPath();
    let x = 0;
    let y = 0;
    for(let i = 0; i < 5; i++) {
      this.context.moveTo(80 + x, 85 + y);
      this.context.bezierCurveTo(60 + x, 60 + y, 120 + x, 40 + y, 100 + x, 0 + y);
      this.context.stroke();
      x += 15;
      y -= 5;
    }
    for(let i = 0; i < 5; i++) {
      this.context.moveTo(80 + x, 85 + y);
      this.context.bezierCurveTo(0 + x, 60 + y, 220 + x, 40 + y, 100 + x, 0 + y);
      this.context.stroke();
      x += 15;
      y += 5;
    }
    this.context.closePath();
  }
}