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
      activityRow: `
        <div class="snap-row transport-row mt-4">
          <div class="snap-child-padding"></div>

          <div class="snap-child snap-child-active">
            <div class="card">
              <img class="card-img-top" src="./assets/profile.png" alt="Card image">
              <div class="card-body">
                <h4 class="card-title">Activity</h4>
                <p class="card-text">Description of some activity</p>
                <a href="#" class="btn btn-primary">Make a reservation</a>
              </div>
            </div>
          </div>
          <div class="snap-child">
            <div class="card">
              <img class="card-img-top" src="./assets/profile.png" alt="Card image">
              <div class="card-body">
                <h4 class="card-title">Activity</h4>
                <p class="card-text">Description of some activity</p>
                <a href="#" class="btn btn-primary">Make a reservation</a>
              </div>
            </div>
          </div>
          <div class="snap-child">
            <div class="card">
              <img class="card-img-top" src="./assets/profile.png" alt="Card image">
              <div class="card-body">
                <h4 class="card-title">Activity</h4>
                <p class="card-text">Description of some activity</p>
                <a href="#" class="btn btn-primary">Make a reservation</a>
              </div>
            </div>
          </div>

          <div class="snap-child-padding"></div>
        </div>
      `,
      snapChildPadding: '<div class="snap-child-padding"></div>',
  }

  let activities = {
    iter: 0,  
    arr: [
      { 
        title: 'Cafe Sabor', 
        img: './assets/cafe_sabor.jpeg', 
        description: 'Vibrant Mexican bistro in a former train station...',
        btn: 'Make Reservation',
        url: 'cafesabor.com'
      },
      { 
        title: 'Mandrain Garden', 
        img: './assets/mandrain.jpg', 
        description: 'Strip-mall Chinese eatery serving traditional fare...',
        btn: 'Make Reservation',
        url: 'mandaringarden.biz'
      },
      { 
        title: `Jack's Wood Fired Oven`, 
        img: './assets/jacks.jpg', 
        description: 'Cozy outpost offering gourmet pizza, pasta &...',
        btn: 'Make Reservation',
        url: 'jackswoodfiredoven.com'
      },
      { 
        title: 'Bowling', 
        img: './assets/bowling.jpeg', 
        description: 'Logan Lanes bowling alley on Main Street in Logan', 
        btn: 'Make Reservation',
        url: 'loganlanesinc.com'
      },
      { 
        title: 'Rock Climbing', 
        img: './assets/climbing.jpg', 
        description: 'Elevation Rock Climbing gym houses the best...', 
        btn: 'Make Reservation',
        url: 'elevationrockgym.com'
      },
      { 
        title: 'Axe Throwing', 
        img: './assets/axe_throwing.jpg', 
        description: 'Heber Hatchets Axe Throwing of Logan will...', 
        btn: 'Make Reservation',
        url: 'heberhatchets.com'
      }
    ]
  }

  function createSnapChild(spec) {
    return `
      <div class="snap-child">
        <div class="card">
          <img class="card-img-top snap-child-image" src="${spec.img}" alt="Card image">
          <div class="card-body">
            <h4 class="card-title">${spec.title}</h4>
            <p class="card-text">${spec.description}</p>
            <a href="${spec.url}" class="btn btn-primary">${spec.btn}</a>
          </div>
        </div>
      </div>
    `;
  } 

  function createActiveSnapChild(spec) {
    return `
      <div class="snap-child snap-child-active">
        <div class="card">
          <img class="card-img-top snap-child-image" src="${spec.img}" alt="Card image">
          <div class="card-body">
            <h4 class="card-title">${spec.title}</h4>
            <p class="card-text">${spec.description}</p>
            <a href="${spec.url}" class="btn btn-primary">${spec.btn}</a>
          </div>
        </div>
      </div>
    `;
  } 

  function createActivityRow(numOfActivities=3) {
    let row = '<div class="snap-row transport-row mt-4">';
    row += components.snapChildPadding;

    row += createActiveSnapChild(activities.arr[activities.iter]);
    activities.iter = (activities.iter + 1) % activities.arr.length;

    for(let i = 1; i < numOfActivities; i++) {
      row += createSnapChild(activities.arr[activities.iter]);
      activities.iter = (activities.iter + 1) % activities.arr.length;
    }

    row += components.snapChildPadding;
    row += '</div>';
    return row;
  }

  $('#activity-section').append(components.transportRow);
  $('#activity-section').append(createActivityRow(3));
  $('#activity-section').append(components.transportRow);
  $('#activity-section').append(createActivityRow(3));
  $('#activity-section').append(components.transportRow);

  $('.snap-row').scrollLeft(100);

  $('.snap-child').click(function() {
    let pos = $(window).scrollTop();

    $(this).addClass('snap-child-active');

    $(this).siblings().removeClass('snap-child-active');
    // $(this).parent().scrollLeft(`${$(this).parent().scrollLeft() + 2}px`);
    $(this).get(0).scrollIntoView()
    $(window).scrollTop(pos);
  });
});