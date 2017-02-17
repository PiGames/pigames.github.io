var hamburger = document.getElementsByClassName('button-open-small-menu')[0];
hamburger.addEventListener('click', function () {
  document.getElementById('main-horizontal-menu').classList.toggle('nav-horizontal-menu');
},false);

var close = document.getElementsByClassName('active-link')[0];
close.addEventListener('click', function () {
  document.getElementById('main-horizontal-menu').classList.remove('nav-horizontal-menu');
},false);
