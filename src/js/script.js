var hamburger = document.getElementsByClassName('button-open-small-menu')[0];
hamburger.addEventListener('click', function () {
  document.getElementById('main-horizontal-menu').classList.toggle('nav-horizontal-menu');
  console.log('dziala wciskanie buttona');
},false);
