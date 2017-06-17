function getCookie( cname ) {
  const name = `${cname}=`;
  const ca = document.cookie.split( ";" );
  for ( let i = 0; i < ca.length; i++ ) {
    let c = ca[i];

    while ( c.charAt( 0 ) === " " ) {
      c = c.substring( 1 );
    }

    if ( c.indexOf( name ) === 0 ) {
      return c.substring( name.length, c.length );
    }
  }
  return "";
}

const languages = navigator.languages;

if ( window.location.pathname.indexOf( "en" ) < 0 && languages.every( ( lang ) => { return lang.indexOf( "pl" ) < 0; } ) && getCookie( "been" ) !== "true" ) {
  const d = new Date();
  d.setTime( d.getTime() + ( 365 * 3 * 24 * 60 * 60 * 1000 ) );
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `been=true;${expires};path=/`;

  window.location.replace( `${window.location.origin}/en` );
}


function resizeSliders() {
  $( ".slider" ).each( function() {
    $( this ).css( {
      minHeight: $( this ).find( ".slide.active" ).outerHeight(),
    } );
  } );
}

resizeSliders();

$( window ).resize( resizeSliders );

$( "img" ).one( "load", () => {
  resizeSliders();
} ).each( function() {
  if ( this.complete ) {
    $( this ).trigger( "load" );
  }
} );

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

    $slider.css( {
      minHeight: $slide.next().outerHeight(),
    } );
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

    $slider.css( {
      minHeight: $slide.prev().outerHeight(),
    } );
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
  $( "#menu-visible" ).prop( "checked", false );
  $( "body" ).removeClass( "menu-open" );
  e.preventDefault();

  const hash = $( this ).attr( "href" ).substring( 1 );
  $( "html, body" ).animate( {
    scrollTop: $( `#${hash}` ).offset().top - $( "nav#topbar" ).height(),
  }, 500 );

  return false;
} );


// Form

function validate( e ) {
  if ( e === true ) {
    $( "label[for='message'], label[for='email'], label[for='name'], label[for='subject']" ).addClass( "touched" );
  } else if ( e ) {
    $( `label[for='${e.target.id}']` ).addClass( "touched" );
  }

  let isValid = true;
  $( "label[for='message'], label[for='email'], label[for='name'], label[for='subject']" ).removeClass( "invalid" );

  if ( $( "#name" ).val() === "" ) {
    $( "label[for='name']" ).addClass( "invalid" );
    isValid = false;
  }

  if ( $( "#email" ).val() === "" || /^.+@.+\..{2,}$/.test( $( "#email" ).val() ) === false ) {
    $( "label[for='email']" ).addClass( "invalid" );
    isValid = false;
  }

  if ( $( "#subject" ).val() === "" ) {
    $( "label[for='subject']" ).addClass( "invalid" );
    isValid = false;
  }

  if ( $( "#message" ).val() === "" ) {
    $( "label[for='message']" ).addClass( "invalid" );
    isValid = false;
  }

  return isValid;
}

function send( token ) {
  $.ajax( {
    method: "POST",
    url: "http://b.legiec.eu/pigames/mail.php",
    data: {
      "g-recaptcha-response": token,
      "name": $( "#name" ).val(),
      "email": $( "#email" ).val(),
      "subject": $( "#subject" ).val(),
      "message": $( "#message" ).val(),
    },
  } )
  .done( ( msg ) => {
    const response = JSON.parse( msg );

    if ( response.success ) {
      $( "form" ).addClass( "sent" );
    }
  } );
}

function onSubmit() {
  if ( validate( true ) ) {
    grecaptcha.execute();
  }

  return false;
}

window.send = send;

$( "form" ).on( "submit", onSubmit );

$( "input, textarea" ).on( "input", validate );
