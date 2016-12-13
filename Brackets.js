"use strict";

// Нужно написать функцию, которая проверят скобочки на корректность 
// (что все закрыто/открыто верно). 
// Функция должна возвращать true или false. 
// Корректные варианты:
// ({})
// [[]()]
// [{()}]
// Некорректные:
// {(})
// ([]
// [])

function brackets(str){
  var matches = [];
  var regopen = /[({[]/;
  var regclose = /[)}\]]/;
  var symbol = '';
  for (var i = 0; i < str.length; i++) {
    symbol = str.charAt(i);
    if (regopen.test(symbol)) matches.push(symbol);
    else if (regclose.test(symbol)) {
      if (matches.length == 0) return false;
      var previous = matches.pop();
      if (symbol == ')' && previous != '(' || symbol == '}' && previous != '{' || symbol == ']' && previous != '[') return false;
    }
  }
  if (matches.length > 0) return false;
  else return true;
}

var str_true = '[[]()]';
var str_false = '{(})';

console.time(brackets(str_true));
console.timeEnd(brackets(str_true));
console.time(brackets(str_false));
console.timeEnd(brackets(str_false));
