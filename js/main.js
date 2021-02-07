$(document).ready(function(){
  // !!!!!!!!!SLIDER!!!!!!!!!!!

   $(function() {
            
                var Page = (function() {

                    var $nav = $( '#nav-dots > span' ),
                        slitslider = $( '#slider' ).slitslider( {
                            onBeforeChange : function( slide, pos ) {

                                $nav.removeClass( 'nav-dot-current' );
                                $nav.eq( pos ).addClass( 'nav-dot-current' );

                            }
                        } ),

                        init = function() {

                            initEvents();
                            
                        },
                        initEvents = function() {

                            $nav.each( function( i ) {
                            
                                $( this ).on( 'click', function( event ) {
                                    
                                    var $dot = $( this );
                                    
                                    if( !slitslider.isActive() ) {

                                        $nav.removeClass( 'nav-dot-current' );
                                        $dot.addClass( 'nav-dot-current' );
                                    
                                    }
                                    
                                    slitslider.jump( i + 1 );
                                    return false;
                                
                                } );
                                
                            } );

                        };

                        return { init : init };

                })();

                Page.init();
            });
  // !!!!!!!!!SLIDER!!!!!!!!!!!




$("a[href^='#tab']").click(function(){
    $('body, html').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 1500)
  });

function moveClass() {
    $('.arrow').toggleClass('arrowActive');
}
setInterval(moveClass, 1500);


 $('#company .btm').click(function() {
  $('html, body').animate({
    scrollTop: $("#values").offset().top -50
  }, 1000)
});

  $('#values .btm').click(function() {
  $('html, body').animate({
    scrollTop: $("#tab3").offset().top -50
  }, 1000)
});

  $('#tab3 .btm').click(function() {
  $('html, body').animate({
    scrollTop: $("#tab4").offset().top -50
  }, 1000)
});


  $(function() {
      function runEffect() {
          $( "#effect" ).toggle('explode', 300);
      };
      $( ".phone" ).click(function() {
          runEffect();
          return false;
      });
    });



$('#prod img').click(function() {
  $('img').addClass('animate');
})



$(".favIcon").click(function(){
  $(this).find('i').toggleClass('fa-heart');
});




    // $(".carousel").swipe({
    //
    //     swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
    //
    //         if (direction == 'left') $(this).carousel('next');
    //         if (direction == 'right') $(this).carousel('prev');
    //
    //     },
    //     allowPageScroll:"vertical"
    //
    // });

// $(function(){
//   'use strict';
//   // инициализация плагина
//   $.jqCart({
//       buttons: '.add_item',
//       handler: './php/handler.php',
//       cartLabel: '.label-place',
//       visibleLabel: true,
//       openByAdding: false,
//       currency: 'грн'
//   });
//   // Пример с дополнительными методами
//   $('#open').click(function(){
//     $.jqCart('openCart'); // открыть корзину
//   });
//   $('#clear').click(function(){
//     $.jqCart('clearCart'); // очистить корзину
//   });
// });

})
