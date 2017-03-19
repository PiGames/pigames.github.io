function resizeSliders() {
  $( ".slider" ).each( function() {
    let size = 0;
    $( this ).find( ".slide" ).each( function() {
      size = Math.max( size, $( this ).outerHeight() );
    } );

    $( this ).css( { height: size } );
  } );
}

resizeSliders();

$( window ).resize( resizeSliders );

$( ".slider-next" ).click( function() {
  const $slider = $( this ).parents( ".slider" );
  const $slide = $slider.find( ".slide.active" );

  if ( !$slide.is( ":last-child" ) ) {
    $slider.removeClass( "on-beggining" );
    $slide
      .removeClass( "active" )
      .addClass( "prev" );

    $slide
      .next()
      .addClass( "active" );
  }

  if ( $slider.find( ".slide.active" ).is( ":last-child" ) ) {
    $slider.addClass( "on-end" );
  }
} );

$( ".slider-prev" ).click( function() {
  const $slider = $( this ).parents( ".slider" );
  const $slide = $slider.find( ".slide.active" );

  if ( !$slide.is( ":first-child" ) ) {
    $slider.removeClass( "on-end" );
    $slide
      .removeClass( "active" );

    $slide.prev()
      .removeClass( "prev" )
      .addClass( "active" );

    $slide.prev().prev()
      .addClass( "prev" );
  }

  if ( $slider.find( ".slide.active" ).is( ":first-child" ) ) {
    $slider.addClass( "on-beggining" );
  }
} );

$( "#menu-visible" ).change( function() {
  if ( $( this ).prop( "checked" ) ) {
    $( "body" ).addClass( "menu-open" );
  } else {
    $( "body" ).removeClass( "menu-open" );
  }
} );

$( "a[href*='#']" ).click( function( e ) {
  e.preventDefault();

  const hash = $( this ).attr( "href" ).substring( 1 );
  $( "html, body" ).animate( {
    scrollTop: $( `#${hash}` ).offset().top - $( "nav#topbar" ).height(),
  }, 500 );

  return false;
} );
