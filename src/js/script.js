/* eslint-disable */

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').stop().animate({
          scrollTop: target.offset().top
        }, 1500);
        return false;
      }
    }
  });
});

var hamburger = document.getElementsByClassName('button-open-small-menu')[0];
hamburger.addEventListener('click', function () {
  var horizontalMenu = document.getElementById('main-horizontal-menu');
  var horizontalMenuUL = horizontalMenu.querySelector( 'ul' );

  var isULOpen = horizontalMenuUL.classList.contains( 'slide-in' );

  horizontalMenuUL.setAttribute( 'class', isULOpen ? 'slide-out' : 'slide-in');

  horizontalMenu.classList.toggle('nav-horizontal-menu');
},false);

var close = document.getElementsByClassName('active-link');

for(var x=0; x<close.length; x++) {
  console.log( close[x] );
  close[x].addEventListener('click', function () {
    document.getElementById('main-horizontal-menu').classList.remove('nav-horizontal-menu');
  },false);
}
