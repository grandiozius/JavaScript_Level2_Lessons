"use strict";

// Разработать класс, генерирующий шахматную доску на странице. 
// Конструктор в качестве параметра должен принимать селектор элемента, 
// в котором должна создаться доска, либо DOM Node. 
// При этом должна быть возможность подписаться на события доски через созданный объект 
// (не напрямую к DOM Node, а именно извне используя только объект доски), 
// получения и установки координаты активной ячейки (шахматной координаты вида “A1”). 
// Для генерации доски можно использовать произвольные html-тэги. 
// Подумать какие свойства должны быть скрыты, а какие нет, 
// решение аргументировать в комментариях к коду.
// Добавить базовый класс, который мог бы генерировать таблицы (доски) любого размера 
// и унаследовать от него разработанный класс шахматной доски.

function Board(height, width, dom_node) {
  var whitepics = ["\u2656", "\u2658", "\u2657", "\u2655", "\u2654", "\u2657", "\u2658", "\u2656"];
  var blackpics = ["\u265C", "\u265E", "\u265D", "\u265B", "\u265A", "\u265D", "\u265E", "\u265C"];
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
      var addr = '';
      if (i == 1) {
        type += ' whitefigures';
        value = whitepics[j - 65];  // доделать
      }
      if (i == 2) {
        type += ' whitepawns';
        value = '\u2659';
      }
      if (i == height - 1) {
        type += ' blackpawns';
        value = '\u265F';
      }
      if (i == height) {
        type += ' blackfigures';
        value = blackpics[j - 65];  // доделать
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