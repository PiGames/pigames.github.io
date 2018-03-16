(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({"/Users/bartoszlegiec/Projects/pigames.github.io/src/js/script.js":[function(require,module,exports){
"use strict";

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var languages = navigator.languages;

if (window.location.pathname.indexOf("en") < 0 && languages.every(function (lang) {
  return lang.indexOf("pl") < 0;
}) && getCookie("been") !== "true") {
  var d = new Date();
  d.setTime(d.getTime() + 365 * 3 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = "been=true;" + expires + ";path=/";

  window.location.replace(window.location.origin + "/en");
}

function resizeSliders() {
  $(".slider").each(function () {
    $(this).css({
      minHeight: $(this).find(".slide.active").outerHeight()
    });
  });
}

resizeSliders();

$(window).resize(resizeSliders);

$("img").one("load", function () {
  resizeSliders();
}).each(function () {
  if (this.complete) {
    $(this).trigger("load");
  }
});

$(".slider-next").click(function () {
  var $slider = $(this).parents(".slider");
  var $slide = $slider.find(".slide.active");

  if (!$slide.is(":last-child")) {
    $slider.removeClass("on-beggining");
    $slide.removeClass("active").addClass("prev");

    $slide.next().addClass("active");

    $slider.css({
      minHeight: $slide.next().outerHeight()
    });
  }

  if ($slider.find(".slide.active").is(":last-child")) {
    $slider.addClass("on-end");
  }
});

$(".slider-prev").click(function () {
  var $slider = $(this).parents(".slider");
  var $slide = $slider.find(".slide.active");

  if (!$slide.is(":first-child")) {
    $slider.removeClass("on-end");
    $slide.removeClass("active");

    $slide.prev().removeClass("prev").addClass("active");

    $slide.prev().prev().addClass("prev");

    $slider.css({
      minHeight: $slide.prev().outerHeight()
    });
  }

  if ($slider.find(".slide.active").is(":first-child")) {
    $slider.addClass("on-beggining");
  }
});

$("#menu-visible").change(function () {
  if ($(this).prop("checked")) {
    $("body").addClass("menu-open");
  } else {
    $("body").removeClass("menu-open");
  }
});

$("a[href*='#']").click(function (e) {
  $("#menu-visible").prop("checked", false);
  $("body").removeClass("menu-open");
  e.preventDefault();

  var hash = $(this).attr("href").substring(1);
  $("html, body").animate({
    scrollTop: $("#" + hash).offset().top - $("nav#topbar").height()
  }, 500);

  return false;
});

// Form

function validate(e) {
  if (e === true) {
    $("label[for='message'], label[for='email'], label[for='name'], label[for='subject']").addClass("touched");
  } else if (e) {
    $("label[for='" + e.target.id + "']").addClass("touched");
  }

  var isValid = true;
  $("label[for='message'], label[for='email'], label[for='name'], label[for='subject']").removeClass("invalid");

  if ($("#name").val() === "") {
    $("label[for='name']").addClass("invalid");
    isValid = false;
  }

  if ($("#email").val() === "" || /^.+@.+\..{2,}$/.test($("#email").val()) === false) {
    $("label[for='email']").addClass("invalid");
    isValid = false;
  }

  if ($("#subject").val() === "") {
    $("label[for='subject']").addClass("invalid");
    isValid = false;
  }

  if ($("#message").val() === "") {
    $("label[for='message']").addClass("invalid");
    isValid = false;
  }

  return isValid;
}

function send(token) {
  $.ajax({
    method: "POST",
    url: "http://b.legiec.eu/pigames/mail.php",
    data: {
      "g-recaptcha-response": token,
      "name": $("#name").val(),
      "email": $("#email").val(),
      "subject": $("#subject").val(),
      "message": $("#message").val()
    }
  }).done(function (msg) {
    var response = JSON.parse(msg);

    if (response.success) {
      $("form").addClass("sent");
    }
  });
}

function onSubmit() {
  if (validate(true)) {
    grecaptcha.execute();
  }

  return false;
}

window.send = send;

$("form").on("submit", onSubmit);

$("input, textarea").on("input", validate);

},{}]},{},["/Users/bartoszlegiec/Projects/pigames.github.io/src/js/script.js"])

//# sourceMappingURL=script.js.map
