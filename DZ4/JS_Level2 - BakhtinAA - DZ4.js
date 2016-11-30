"use strict";

// Создайте компонент «Часы» (Clock).
// Интерфейс:
// var clock = new Clock({
//   elem: элемент
// });
// clock.start(); // старт
// clock.stop(); // стоп
// Остальные методы, если нужны, должны быть приватными.
// При нажатии на alert часы должны приостанавливаться, а затем продолжать идти с правильным временем.

function Clock(options) {
  var clockON = true;
  var timerID = 0;
  
  function getElem() {
    var elem = document.querySelector('.clock');
    return elem;
  }
  
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
    
  function render() {
    var clocknode = document.querySelector(options.node) || document.body;
    var elem = document.createElement('div');
    elem.className = 'clock';
    elem.onclick = toggle;
    clocknode.appendChild(elem);
  }

  function renew() {
    getElem().innerHTML = getTime();
  }
  
  function start() {
    if (getElem() == null) render();
    timerID = setInterval(renew, 1000);
    clockON = true;
  };

  function stop() {
    clearInterval(timerID);
    clockON = false;
  };

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

var clock = new Clock({node:"body"});
clock.start();

// Напишите функцию-конструктор new Voter(options) для голосовалки. 
// Она должна получать элемент в options.elem, в следующей разметке:
// <div id="voter" class="voter">
//   <span class="down">—</span>
//   <span class="vote">0</span>
//   <span class="up">+</span>
// </div>
// По клику на + и — число должно увеличиваться или уменьшаться.
// Публичный метод voter.setVote(vote) должен устанавливать текущее число – значение голоса.
// Все остальные методы и свойства пусть будут приватными.

function Voter(options) {
  
  function getElem() {
    var elem = document.querySelector('.vote');
    return elem;
  }
  
  function render() {
    var voternode = document.querySelector(options.node) || document.body;
    var voterelem = document.createElement('div');
    voterelem.id = 'voter';
    voterelem.className = 'voter';
    voterelem.onclick = setVote;
    voternode.appendChild(voterelem);
    var downelem = document.createElement('span');
    downelem.className = 'down';
    downelem.innerHTML = '-';
    voterelem.appendChild(downelem);
    var voteelem = document.createElement('span');
    voteelem.className = 'vote';
    voteelem.innerHTML = '0';
    voterelem.appendChild(voteelem);
    var upelem = document.createElement('span');
    upelem.className = 'up';
    upelem.innerHTML = '+';
    voterelem.appendChild(upelem);
  }

  render();
  
  function setVote(e) {
    var vote = parseInt(getElem().innerHTML);
    if (e.target.className == 'down') vote -= 1;
    if (e.target.className == 'up') vote += 1;
    getElem().innerHTML = vote;
  }
    
  this.setVote = setVote;
}

var voter = new Voter({node:"body"});

// Переписать доску для рисования из урока в виде графической компоненты

function Canvas(options) {
  
  function getElem() {
    var elem = document.querySelector('canvas');
    return elem;
  }

  function render() {
    var canvasnode = document.querySelector(options.node) || document.body;
    var canvaselem = document.createElement('canvas');
    canvaselem.id = 'canvas';
    canvaselem.width = '300';
    canvaselem.height = '300';
    canvasnode.appendChild(canvaselem);
  }
  
  render();
  
  var context = getElem().getContext('2d');
  if (!context) {
    alert('Скачай нормальный браузер');
  }

  function draw() {
    // Цвет обводки
    context.strokeStyle = '#f00';
    // Цвет заливки
    context.fillStyle = '#ff0';
    // Толщина линий
    context.lineWidth   = 4;
    // Рисуем голову. Рисование всегда начинается с beginPath
    context.beginPath();
    // Размечаем дугу с центром в точке (150, 150), радиусом 100px, начальным углом 0, конечным 360 градусов, рисование производится по часовой стрелке. Иными словами получаем окружность
    context.arc(150, 150, 100, 0, 2*Math.PI, true);
    // Обводим
    context.stroke();
    // Завершаем рисование
    context.closePath();
    // Начинаем рисование
    context.beginPath();
    // Рисуем окружность (глаз)
    context.arc(110, 110, 15, 0, 2*Math.PI, true);					
    // Закрашиваем
    context.fill();
    // Заканчиваем рисование
    context.closePath();
    // Рисуем второй глаз
    context.beginPath();
    context.arc(190, 110, 15, 0, 2*Math.PI, true);
    context.fill();
    context.closePath();
    // Рисуем нос
    context.beginPath();
    // Функция устанавливает точку из которой будет осуществляться рисование
    context.moveTo(150, 120);
    // Проводит линию из установленной точки, в указанную и так же устанавливает точку из которой будет осуществляться рисование
    context.lineTo(135, 180);
    context.lineTo(165, 180);
    context.stroke();
    context.closePath();
    // Рот
    context.beginPath();
    // Половинка окружности
    context.arc(150, 150, 70, Math.PI, 2*Math.PI, true);
    context.stroke();
    context.closePath();
    // Волосы – другим цветом
    context.strokeStyle = '#000';
    context.beginPath();
    var x = 0;
    var y = 0;
    for(var i = 0; i < 5; i++) {
      context.moveTo(80 + x, 85 + y);
    // Кривая безье
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

var canvas = new Canvas({node:"body"});
canvas.draw();
