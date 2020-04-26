$(document).ready(function(){
  let components = {
    transportRow: `
        <div class="snap-row transport-row mt-4">
          <div class="snap-child-padding"></div>

          <div class="snap-child snap-child-active">
            <div class="card">
              <img class="card-img-top" src="./assets/uber_logo.png" alt="Card image">
              <div class="card-body">
                <h4 class="card-title">Uber</h4>
                <p class="card-text">Let Uber take you to your next activity</p>
                <a href="#" class="btn btn-primary">Use Uber</a>
              </div>
            </div>
          </div>
          <div class="snap-child snap-child-left">
            <div class="card">
              <img class="card-img-top" src="./assets/maps.png" alt="Card image">
              <div class="card-body">
                <h4 class="card-title">Directions</h4>
                <p class="card-text">Drive, bike, or walk to your destination</p>
                <a href="#" class="btn btn-primary">Open Maps</a>
              </div>
            </div>
          </div>

          <div class="snap-child-padding"></div>
        </div>
      `,
  }

  $('#activity-section').append(components.transportRow);

  $('.snap-row').scrollLeft(100);

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