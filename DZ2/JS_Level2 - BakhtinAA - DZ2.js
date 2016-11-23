"use strict";

// Создайте код, который загрузит файл phones.json из текущей директории
// и выведет все названия телефонов из него в виде списка.
/*
var xhr = new XMLHttpRequest();
xhr.open('GET', 'phones.json');
xhr.send();
xhr.onreadystatechange = function() {
  if (xhr.readyState != 4) return;
  if (xhr.status != 200) alert(xhr.status + ': ' + xhr.statusText);
  else alert(xhr.responseText);
};
var obj = JSON.parse(xhr, function(key, value) {
  if (key == 'name') return value;
  else return undefined;
});

var list = document.createElement('ul');
for (var i = 0; i < obj.length; i++) {
    var li = document.createElement('li');
    li.innerText = obj[i];
    list.appendChild(li);
}
document.body.appendChild(list);
*/

// Добавить вывод фигур в шахматную доску из предыдущего урока.
// Написать инициализацию расположения фигур с помощью ajax-запроса к json-файлу.
// Формат данного файла придумать и осуществить самостоятельно.
// * Добавить возможность отсутствия фигур (например, если они были срублены)
// и предусмотреть проверку корректности данных (например, что на доске сейчас находится не больше двух королей и тп.),
// в случае, если данные некорректны – выдать человекопонятную ошибку.

function Board(height, width, dom_node) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'figures.json');
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) alert(xhr.status + ': ' + xhr.statusText);
    else alert(xhr.responseText);
  };
  var white = JSON.parse(xhr, function(key, value) {
    if (key == 'white') return value;
    else return undefined;
  });
  var black = JSON.parse(xhr, function(key, value) {
    if (key == 'black') return value;
    else return undefined;
  });
  var multipl = Math.trunc((width - 1)/ 6);
  var ost = width - 1 - (6 * multipl);
  var whitepics = [];
  var blackpics = [];
  for (var k = 0; k < multipl; k++) {
    whitepics[k] = white.tower;
    whitepics[width - k] = white.tower;
    whitepics[k + multipl] = white.knight;
    whitepics[width - multipl - k] = white.knight;
    whitepics[k + 2 * multipl] = white.bishop;
    whitepics[width - 2 * multipl - k] = white.bishop;
    blackpics[k] = black.tower;
    blackpics[width - k] = black.tower;
    blackpics[k + multipl] = black.knight;
    blackpics[width - multipl - k] = black.knight;
    blackpics[k + 2 * multipl] = black.bishop;
    blackpics[width - 2 * multipl - k] = black.bishop;
  }
  for (var k = 0; k < ost; k++) {
    whitepics[3 * multipl + k] = white.queen;
    blackpics[3 * multipl + k] = black.queen;
  }
  whitepics[3 * multipl + ost] = white.king;
  blackpics[3 * multipl + ost] = black.king;
  var masterdiv = document.createElement('div');
  dom_node.appendChild(masterdiv);
  var row = document.createElement('div');
  masterdiv.appendChild(row);
  for (var k = 0; k < 3; k++) {
    var blankcell = new Cell('txt', '');
    row.appendChild(blankcell.element);
  }
  for (var k = 65; k < 65 + width; k++) {
    var adcell = new Cell('txt', String.fromCharCode(k));
    row.appendChild(adcell.element);
  }
  for (var k = 0; k < 3; k++) {
    var blankcell = new Cell('txt', '');
    row.appendChild(blankcell.element);
  }
  var logger = new Logger();
  row.appendChild(logger.element);
  masterdiv.log = logger;
  masterdiv.getLog = function() {
    return masterdiv.log.element.innerHTML;
  }
  masterdiv.setLog = function(value) {
    masterdiv.log.element.innerHTML = value;
  }
  for (var i = 1; i < 1 + height; i++) {
    var row = document.createElement('div');
    masterdiv.appendChild(row);
    for (var k = 0; k < 2; k++) {
      var whitedelcell = new Cell('txt whitedeleted', '');
      row.appendChild(whitedelcell.element);
    }
    var drcell = new Cell('txt', i);
    row.appendChild(drcell.element);
    for (var j = 65; j < 65 + width; j++) {
      var type = (i + j) % 2 == 0 ? 'field txt black': 'field txt white';
      var value = '';
      if (i == 1) {
        type += ' whitefigures';
        value = whitepics[j - 65];
      }
      if (i == 2) {
        type += ' whitepawns';
        value = white.pawn;
      }
      if (i == height - 1) {
        type += ' blackpawns';
        value = black.pawn;
      }
      if (i == height) {
        type += ' blackfigures';
        value = blackpics[j - 65];
      }
      type += ' ' + String.fromCharCode(j) + i;
      var fcell = new Cell(type, value);
      row.appendChild(fcell.element);
    }
    var blankcell = new Cell('txt', '');
    row.appendChild(blankcell.element);
    for (var k = 0; k < 2; k++) {
      var blackdelcell = new Cell('txt blackdeleted', '');
      row.appendChild(blackdelcell.element);
    }
  }
  this.clicklistener = function(func) {
    masterdiv.addEventListener('click', func);
  }
}

function Cell(type, value) {
  this.element = document.createElement('div');
  this.element.className = type;
  this.element.innerHTML = value;
}

function Logger() {
  this.element = document.createElement('div');
  this.element.id = 'log';
  this.element.innerHTML = '';
}

function ChessBoard() {
  Board.call(this, 8, 8, document.body);
}

function selectfield(e) {
  var target = e.target;
  var selected = document.getElementById('selected');
  if (selected != null) selected.removeAttribute('id');
  var targetclass = target.className;
  var searchfield = new RegExp('field', 'i');
  if (searchfield.test(targetclass)) {
    target.id = 'selected';
    var addr = targetclass.slice(-2);
    this.setLog(addr);
  }
}

var chessboard = new ChessBoard();
chessboard.clicklistener(selectfield);