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

function Board (height, width, dom_node) {
  var whitepics = ["\u2656", "\u2658", "\u2657", "\u2655", "\u2654", "\u2657", "\u2658", "\u2656"];
  var blackpics = ["\u265C", "\u265E", "\u265D", "\u265B", "\u265A", "\u265D", "\u265E", "\u265C"];
  var row = document.createElement('div');
  dom_node.appendChild(row);
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
  var log = new Cell('log', '');
  this.log = log;
  this.getlog = function() {
    return this.log.value;
  };
  this.setlog = function(value) {
    this.log.value = value;
    log.element.innerHTML = value;
  };
  row.appendChild(log.element);
  for (var i = 1; i < 1 + height; i++) {
    var row = document.createElement('div');
    dom_node.appendChild(row);
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
      var fcell = new FieldCell(type, value);
      fcell.addr = String(j) + String(i);
      row.appendChild(fcell.element);
    }
    var blankcell = new Cell('txt', '');
    row.appendChild(blankcell.element);
    for (var k = 0; k < 2; k++) {
      var blackdelcell = new Cell('txt blackdeleted', '');
      row.appendChild(blackdelcell.element);
    }
  }
}

function Cell (type, value) {
  this.element = document.createElement('div');
  this.element.className = type;
  this.element.innerHTML = value;
}

function FieldCell () {
  Cell.apply(this, arguments);
  this.addr = '';
  this.element.addEventListener("click", selectfield);
//  this.element.addEventListener("keydown", arrowsselect);
}

function selectfield() {
  var selected = document.getElementById("selected");
  //  if (this.innerHTML != "") deletefigure(this);
  if (selected != null) selected.removeAttribute("id");
  this.id = "selected";
  
}

var chessboard = new Board(8, 8, document.body);


/*
// JS_Level1_DZ8

// Шахматная доска. 
// С дополнительными полями для удаленных фигур и логом. 
function chessboard() {
  var divrow = document.createElement("div");                                                      // строка с именами столбцов
  document.body.appendChild(divrow);
  var divlog = document.createElement("div");                                                      // лог
  divlog.id = "log";
  divrow.appendChild(divlog);
  for (var k = 0; k < 3; k++) {
    var divcell = document.createElement("div");
    divcell.className = "txt";
    divrow.appendChild(divcell);
  }
  for (var k = 65; k < 73; k++) {                                                                  // A B C D E F G H
    var divcell = document.createElement("div");
    divcell.className = "txt";
    divcell.innerHTML = String.fromCharCode(k);
    divrow.appendChild(divcell);
  }
  for (var k = 0; k < 3; k++) {
    var divcell = document.createElement("div");
    divcell.className = "txt";
    divrow.appendChild(divcell);
  }
  for (var i = 1; i < 9; i++) {                                                                    // строки шахматной доски
    var divrow = document.createElement("div");
    document.body.appendChild(divrow);
    for (var k = 0; k < 2; k++) {                                                                  // для удаленных белых
      var divcell = document.createElement("div");
      divcell.className = "txt whitedeleted";
      divrow.appendChild(divcell);
    }
    var divcell = document.createElement("div");
    divcell.className = "txt";
    divcell.innerHTML = i;                                                                         // 1 2 3 4 5 6 7 8
    divrow.appendChild(divcell);
    for (var j = 65; j < 73; j++) {                                                                // клетки шахматной доски
      var divcell = document.createElement("div");
      if (i == 1) divcell.className = "whitefigures ";                                             // строка белых фигур
      if (i == 2) divcell.className = "whitepawns ";                                               // строка белых пешек
      if (i == 7) divcell.className = "blackpawns ";                                               // строка черных пешек
      if (i == 8) divcell.className = "blackfigures ";                                             // строка черных фигур
      divcell.className += (i + j) % 2 == 0 ? "field txt black": "field txt white";                // черная или белая клетка
      divcell.className += " " + String.fromCharCode(j) + i;                                       // адрес клетки для отображения
      divcell.setAttribute("tabindex", String(j) + String(i));                                     // уникальный идентификатор клетки
      divrow.appendChild(divcell);
    }
    var divcell = document.createElement("div");
    divcell.className = "txt";
    divrow.appendChild(divcell);
    for (var k = 0; k < 2; k++) {                                                                  // для удаленных черных
      var divcell = document.createElement("div");
      divcell.className = "txt blackdeleted";
      divrow.appendChild(divcell);
    }
  }
}

chessboard();

function addFigures() {                                                                            // выставление фигур на доску
  var whitefigures = document.getElementsByClassName("whitefigures");
  var whitepics = ["\u2656", "\u2658", "\u2657", "\u2655", "\u2654", "\u2657", "\u2658", "\u2656"];
  for (var i = 0; i < 8; i++) {
    whitefigures[i].innerHTML = whitepics[i];
  }
  var whitepawns = document.getElementsByClassName("whitepawns");
  for (var i = 0; i < whitepawns.length; i++) {
    whitepawns[i].innerHTML = "\u2659";
  }
  var blackpawns = document.getElementsByClassName("blackpawns");
  for (var i = 0; i < blackpawns.length; i++) {
    blackpawns[i].innerHTML = "\u265F";
  }
  var blackfigures = document.getElementsByClassName("blackfigures");
  var blackpics = ["\u265C", "\u265E", "\u265D", "\u265B", "\u265A", "\u265D", "\u265E", "\u265C"];
  for (var i = 0; i < 8; i++) {
    blackfigures[i].innerHTML = blackpics[i];
  }
}

addFigures();

// При щелчке мышью на любую клетку доски – необходимо писать ее адрес в произвольное место страницы. 
// Адрес должен извлекаться в «шахматном» формате. Например: A1, G6 и тп. 
// При этом, ячейка, на которую нажали должна помечаться произвольным образом, например, выделением рамки или другим цветом. 
// При выделении другой ячейки, предыдущая должна возвращаться к первоначальному виду.

function listenerforfield() {
  var field = document.getElementsByClassName("field");
  for (var i = 0; i < field.length; i++) {
    field[i].addEventListener("click", selectfield);                                               // обработчик клика мышкой по доске
    field[i].addEventListener("keydown", arrowsselect);                                            // обработчик стрелок клавиатуры
  }
}

listenerforfield();

function selectfield() {
  var selected = document.getElementById("selected");                                              // выбранная ранее клетка
  if (this.innerHTML != "") deletefigure(this);                                                    // удаляет фигуру с доски
  if (selected != null) selected.removeAttribute("id");
  this.id = "selected";                                                                            // выделяет текущую клетку
  var addr = this.className.slice(-2);
  var log = document.getElementById("log");
  log.innerHTML = addr;                                                                            // запись адреса клетки в лог
}

// Научиться обрабатывать стрелки клавиатуры таким образом, 
// чтобы активную ячейку из предыдущего пункта можно было перемещать по доске. 
// Если ячейка выходит за границы таблицы – она должна появиться с другой стороны. 
// При перемещении ячейки, так же должен извлекаться ее адрес.
function arrowsselect(e) {
  var selected = document.getElementById("selected");
  if (selected != null) {
    selected.removeAttribute("id");
    var tab = selected.getAttribute("tabindex");                                                   // получение адреса клетки из ее уникального идентификатора
    var ad = tab.slice(0, 2);                                                                      // столбец
    var dr = tab.slice(-1);                                                                        // строка
    switch (e.keyCode) {
      case 37:                                                                                     // стрелка влево
        ad = (ad != 65 ) ? (parseInt(ad) - 1) : 72;                                                // если A, перейти на H
        break;
      case 38:                                                                                     // стрелка вверх
        dr = (dr != 1) ? (parseInt(dr) - 1) : 8;                                                   // если 1, перейти на 8
        break;
      case 39:                                                                                     // стрелка вправо
        ad = (ad != 72) ? (parseInt(ad) + 1) : 65;                                                 // если H, перейти на A
        break;
      case 40:                                                                                     // стрелка вниз
        dr = (dr != 8) ? (parseInt(dr) + 1) : 1;                                                   // если 8, перейти на 1
        break;
    }
    var addr = String.fromCharCode(ad) + String(dr);
    selected = document.getElementsByClassName(addr);
    selected[0].id = "selected";
  }
  else {
    selected = document.getElementsByClassName("A1");
    selected[0].id = "selected";
    var addr = "A1";
  }
  var log = document.getElementById("log");
  log.innerHTML = addr;
}

// * Добавить возможность удалять фигуры с доски и возвращать их на прежнее место. 
// Таким образом, необходимо добавить вверху и внизу таблицы область, для «уничтоженных» фигур. 
// При нажатии на любую фигуру на доске, она должна становиться «уничтоженной», 
// т.е. удаляться с доски и перемещаться в соответствующую область (черные в одну сторону, белые – в другую). 
// При нажатии на «уничтоженную» фигуру она должна вернуться на прежнее место.  
function deletefigure(selected) {
  if (selected.className.indexOf("whitefigures") != -1  || selected.className.indexOf("whitepawns") != -1) {
    var deleted = document.getElementsByClassName("whitedeleted");
  }
  else if (selected.className.indexOf("blackfigures") != -1 || selected.className.indexOf("blackpawns") != -1) {
    var deleted = document.getElementsByClassName("blackdeleted");
  }
  else return;
  var tab = selected.getAttribute("tabindex");
  for (var i = 0; i < deleted.length; i++) {
    if (deleted[i].innerHTML == "") {
      deleted[i].className += " " + tab;                                                           // идентификатор, чтобы вернуть фигуру на доску
      deleted[i].innerHTML = selected.innerHTML;
      selected.innerHTML = "";
      break;
    }
  }
}

function listenerfordeleted() {
  var whitedeleted = document.getElementsByClassName("whitedeleted");
  var blackdeleted = document.getElementsByClassName("blackdeleted");
  for (var i = 0; i < whitedeleted.length; i++) whitedeleted[i].addEventListener("click", returnfig);
  for (var i = 0; i < blackdeleted.length; i++) blackdeleted[i].addEventListener("click", returnfig);
}

listenerfordeleted();

function returnfig() {                                                                             // возвращение фигуры на доску
  var tab = this.className.slice(-3);
  var field = document.getElementsByClassName("field");
  for (var i = 0; i < field.length; i++) {
    if (field[i].getAttribute("tabindex") == tab) {
      var retfig = field[i];
      break;
    }
  }
  retfig.innerHTML = this.innerHTML;
  this.innerHTML = "";
  this.className = this.className.slice(0, -3);
}
*/