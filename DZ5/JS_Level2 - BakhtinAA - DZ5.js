"use strict";

// С помощью jQuery cоздать контрол, работающий с вкладками. 
// Пример - http://dimox.name/examples/universal-jquery-tabs-script/ 
// Можно использовать любую анимацию, методы show, hide и подобные. Код примера желательно не смотреть.

(function($) {

  function createNavbar(node, firstitemtext) {
    $(node).prepend("<div id='navbar'>");
    $("#navbar").append("<nav>").click(function(e) {
      $(e.target).addClass('active').siblings().removeClass('active');
      return false;
    });
    $("nav").append("<ul>");
    var firstitem = $("<li>");
    firstitem.text(firstitemtext);
    firstitem.addClass('active');
    $("#navbar ul").append(firstitem);
  }

  function addNavbarItems(itemtext) {
    var item = $("<li>");
    item.text(itemtext);
    item.appendTo("#navbar ul");
  }

  function delNavbarItem(itemtext) {
    var item = $("#navbar ul li:contains(" + itemtext + ")");
    item.remove();
  }

  createNavbar("body", "first item");
  addNavbarItems("second item");
  addNavbarItems("third item");
  addNavbarItems("fourth item");
  delNavbarItem("third item");

})(jQuery);

// Необходимо скачать, прилагаемый файл  validator.php. 
// Самостоятельно разобраться в формате данных который он отдает. 
// С помощью ajax запросов к этому файлу необходимо реализовать валидатор формы. 
// array(
//   'username' => 'Somebody',
//   'password' => 'mypassword',
//   'email' => 'some@some.ru',
//   'gender' => 'm',
//   'credit_card' => '9872389-2424-234224-234', 
//   'bio' => 'This is good! I think I will switch to another language'
// )
// Ограничения:
// 1. Все поля обязательные
// 2. Пол - 1 символ (M, Ж)
// 3. Email и credit card должны быть указаны в соответствующем формате.
// 4. Логин и пароль, мин длинна 6 символов, макс - 100

(function ($) {
  
  function createForm(node) {
    $(node).append("<form id='myform'>");
    $("#myform").append("<label for='username'> Username: ").append("<input type='text' id='username' required>");
    $("#myform").append("<label for='password'> Password: ").append("<input type='password' id='password' required>");
    $("#myform").append("<label for='email'> E-mail: ").append("<input type='email' id='email' required>");
    $("#myform").append("<label for='gender'> Gender: ").append("<input type='text' id='gender' required>");
    $("#myform").append("<label for='credit_card'> Credit card: ").append("<input type='text' id='credit_card' required>");
    $("#myform").append("<label for='bio'> Bio: ").append("<input type='text' id='bio' required>");
    $("#myform").append("<button type='submit' id='submit'>Submit");
    $("#myform #submit").click(validateForm);
  }

  function validateForm() {
    var fail = $("#myform input + span");
    if ( fail == true) fail.remove();
    var success = $("#myform #submit + span");
    if ( success == true) success.remove();
    var dataobj = getData();
    $.post("validator.php", dataobj)
      .done(function(data) {
        data = JSON.parse(data);
        if (data.result == true) $("#submit").after("<span class='success'> Success ");
        else {
          var err = data.error;
          if (err.username == true) $("#myform #username").after("<span class='fail'> Fail! ");
          if (err.password == true) $("#myform #password").after("<span class='fail'> Fail! ");
          if (err.email == true) $("#myform #email").after("<span class='fail'> Fail! ");
          if (err.gender == true) $("#myform #gender").after("<span class='fail'> Fail! ");
          if (err.credit_card == true) $("#myform #credit_card").after("<span class='fail'> Fail! ");
          if (err.bio == true) $("#myform #bio").after("<span class='fail'> Fail! ");
        }
      })
      .fail(function() {
        console.log("ajax post error");
      });
    return false;
  }
  
  function getData() {
    var obj = {};
    var username = $("#myform #username");
    var password = $("#myform #password");
    var email = $("#myform #email");
    var gender = $("#myform #gender");
    var credit_card = $("#myform #credit_card");
    var bio = $("#myform #bio");
    obj[username.attr("id")] = username.val();
    obj[password.attr("id")] = password.val();
    obj[email.attr("id")] = email.val();
    obj[gender.attr("id")] = gender.val();
    obj[credit_card.attr("id")] = credit_card.val();
    obj[bio.attr("id")] = bio.val();
    return obj;
  }

  function setData() {
    $("#myform #username").val('Somebody');
    $("#myform #password").val('mypassword');
    $("#myform #email").val('some@some.ru');
    $("#myform #gender").val('m');
    $("#myform #credit_card").val('9872389-2424-234224-234');
    $("#myform #bio").val('This is good! I think I will switch to another language');
  }
  
  createForm("body");
  setData();

  
})(jQuery);