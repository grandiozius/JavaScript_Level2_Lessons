"use strict";

// Напишите регулярное выражение для поиска HTML-цвета, 
// заданного как #ABCDEF, то есть # и содержит затем 6 шестнадцатеричных символов.

var color = 'red, #A943EE, #FFFFFF, #AAA';
console.log(color.match(/#[\da-f]{6}\b/ig));

// Создайте регэксп, который ищет все положительные числа, 
// в том числе и с десятичной точкой. Например, var str = "1.5 0 12. 123.4."

var str = '1.5 0 12. 123.4.';
console.log(str.match(/\d+(\.\d*)?\s/g));

// Время может быть в формате часы:минуты или часы-минуты. 
// И часы и минуты состоят из двух цифр, например 09:00, 21-30. 
// Напишите регулярное выражение для поиска времени

var time = '09:00 21-30';
console.log(time.match(/\b([0-2]\d)|(2[0-3])[:-][0-5]\d\b/g));

// Написать проверку правильности координаты в файле инициализации шахматной доски 
// c помощью регулярного выражения. Он должен иметь формат вида A6.

var addr = 'A6';
console.log(addr.match(/\b[A-H][1-8]\b/));

// Написать регулярные выражения для следующих сущностей: 
// номер телефона в формате +7(965)-123-45-67, email, серии и номера паспорта. 
// Применить написанные регулярные выражения необходимо для валидации произвольной формы, 
// в которой обязательно должны присутствовать описанные выше поля. 
// Поля, которые проходят валидацию подсветить зеленым, остальные – красным.

var form = document.createElement('form');
document.body.appendChild(form);

var phone = document.createElement('input');
phone.type = 'text';
phone.className = 'phone';
phone.placeholder = 'Phone';
phone.addEventListener('click', stylenorm);
phone.addEventListener('keydown', stylenorm);
form.appendChild(phone);

var email = document.createElement('input');
email.type = 'text';
email.className = 'email';
email.placeholder = 'E-mail';
email.addEventListener('click', stylenorm);
email.addEventListener('keydown', stylenorm);
form.appendChild(email);

var passport = document.createElement('input');
passport.type = 'text';
passport.className = 'passport';
passport.placeholder = 'Passport';
passport.addEventListener('click', stylenorm);
passport.addEventListener('keydown', stylenorm);
form.appendChild(passport);

var checkbtn = document.createElement('button');
checkbtn.className = 'checkbtn';
checkbtn.innerHTML = 'Check';
checkbtn.addEventListener('click', check);
form.appendChild(checkbtn);

function check(e) {
  e.preventDefault();
  var phone = document.getElementsByClassName('phone');
  var email = document.getElementsByClassName('email');
  var passport = document.getElementsByClassName('passport');
  var checkphone = /^\+7\(\d{3}\)\-\d{3}\-\d{2}\-\d{2}$/;
  var checkemail = /^\w+@\w+\.[a-z]{2,3}$/i;
  var checkpassport = /^\d{4}\s\d{6}$/;
  phone[0].style.backgroundColor = checkphone.test(phone[0].value) ? 'green' : 'red';
  email[0].style.backgroundColor = checkemail.test(email[0].value) ? 'green' : 'red';
  passport[0].style.backgroundColor = checkpassport.test(passport[0].value) ? 'green' : 'red';
}

function stylenorm(e) {
  var target = e.target;
  target.style.backgroundColor = 'white';
}