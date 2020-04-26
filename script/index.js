$(document).ready(function(){
  $('.snap-row').scrollLeft('100px');

  $('.snap-child').click(function() {
    let pos = $(window).scrollTop();

    if($(this).hasClass('snap-child-active'))
      $(this).removeClass('snap-child-active');
    else
      $(this).addClass('snap-child-active');

    $(this).siblings().removeClass('snap-child-active');
    // $(this).parent().scrollLeft(`${$(this).parent().scrollLeft() + 2}px`);
    $(this).get(0).scrollIntoView()
    $(window).scrollTop(pos);
  });
});