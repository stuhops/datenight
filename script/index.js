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
        title: 'Bowling', 
        img: './assets/bowling.jpeg', 
        description: 'Logan Lanes bowling alley on Main Street in Logan', 
        btn: 'Make Reservation',
        url: 'loganlanesinc.com'
      },
      { 
        title: 'Rock Climbing', 
        img: './assets/climbing.jpg', 
        description: 'Elevation Rock Climbing gym houses the best indoor climbing in Logan. Come check us out!', 
        btn: 'Make Reservation',
        url: 'elevationrockgym.com'
      },
      { 
        title: 'Rock Climbing', 
        img: './assets/bowling.jpeg', 
        description: 'Elevation Rock Climbing gym houses the best indoor climbing in Logan. Come check us out!', 
        btn: 'Make Reservation',
        url: 'elevationrockgym.com'
      },

    ]
  }

  function createSnapChild(spec) {
    return `
      <div class="snap-child">
        <div class="card">
          <img class="card-img-top" src="${spec.img}" alt="Card image">
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
    let row = '';
    row += components.snapChildPadding;

    for(let i = 0; i < numOfActivities; i++) {
      row += createSnapChild(activities.arr[activities.iter]);
      activities.iter++;
    }

    row += components.snapChildPadding;
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