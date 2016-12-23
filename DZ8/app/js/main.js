"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clock = function () {
  function Clock(elem) {
    var _this = this;

    _classCallCheck(this, Clock);

    elem.addEventListener('click', function (e) {
      _this.toggle(e);
    });
    this.elem = elem;
    this.start;
    this.stop;
  }

  _createClass(Clock, [{
    key: 'getTime',
    value: function getTime() {
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
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.timerID = setInterval(function () {
        _this2.elem.innerHTML = _this2.getTime();
      }, 1000);
      this.clockON = true;
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.timerID);
      this.clockON = false;
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.clockON) {
        alert('Time stopped at: ' + this.elem.innerHTML);
        this.stop();
      } else {
        alert('Time started');
        this.start();
      }
    }
  }]);

  return Clock;
}();

var Voter = function () {
  function Voter(elem) {
    var _this3 = this;

    _classCallCheck(this, Voter);

    elem.addEventListener('click', function (e) {
      _this3.setVote(e);
    });
  }

  _createClass(Voter, [{
    key: 'setVote',
    value: function setVote(event) {
      var vote = parseInt(document.querySelector('.vote').innerHTML);
      if (event.target.className == 'down') vote -= 1;
      if (event.target.className == 'up') vote += 1;
      document.querySelector('.vote').innerHTML = vote;
    }
  }]);

  return Voter;
}();

var Canvas = function () {
  function Canvas(elem) {
    _classCallCheck(this, Canvas);

    var context = elem.getContext('2d');
    if (!context) alert('Скачай нормальный браузер');
    this.context = context;
    this.draw;
  }

  _createClass(Canvas, [{
    key: 'draw',
    value: function draw() {
      this.context.strokeStyle = '#f00';
      this.context.fillStyle = '#ff0';
      this.context.lineWidth = 4;
      this.context.beginPath();
      this.context.arc(150, 150, 100, 0, 2 * Math.PI, true);
      this.context.stroke();
      this.context.closePath();
      this.context.beginPath();
      this.context.arc(110, 110, 15, 0, 2 * Math.PI, true);
      this.context.fill();
      this.context.closePath();
      this.context.beginPath();
      this.context.arc(190, 110, 15, 0, 2 * Math.PI, true);
      this.context.fill();
      this.context.closePath();
      this.context.beginPath();
      this.context.moveTo(150, 120);
      this.context.lineTo(135, 180);
      this.context.lineTo(165, 180);
      this.context.stroke();
      this.context.closePath();
      this.context.beginPath();
      this.context.arc(150, 150, 70, Math.PI, 2 * Math.PI, true);
      this.context.stroke();
      this.context.closePath();
      this.context.strokeStyle = '#000';
      this.context.beginPath();
      var x = 0;
      var y = 0;
      for (var i = 0; i < 5; i++) {
        this.context.moveTo(80 + x, 85 + y);
        this.context.bezierCurveTo(60 + x, 60 + y, 120 + x, 40 + y, 100 + x, 0 + y);
        this.context.stroke();
        x += 15;
        y -= 5;
      }
      for (var _i = 0; _i < 5; _i++) {
        this.context.moveTo(80 + x, 85 + y);
        this.context.bezierCurveTo(0 + x, 60 + y, 220 + x, 40 + y, 100 + x, 0 + y);
        this.context.stroke();
        x += 15;
        y += 5;
      }
      this.context.closePath();
    }
  }]);

  return Canvas;
}();