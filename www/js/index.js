

var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
    setTimeout(function() {
      hideSplash();
      setUnsplashImg();
    }, 1200);
  },
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);
  },
  historyStack: [],
  page: 0
};

app.initialize();

window.onload = function() {

  document.addEventListener('touchstart', touchHandler, false);
  document.addEventListener('touchmove', touchHandler, false);
  document.addEventListener('touchend', touchHandler, false);
  document.addEventListener('click', touchHandler, false);
  //document.addEventListener('click', function() {
  //  console.log('DAnk and AHELL');
  //}, false);
};




// ------------------------------------ TOUCH EVENT HANDLERS --------------------------------- //


touches = {
  "touchstart": {"x":-1, "y":-1},
  "touchmove" : {"x":-1, "y":-1},
  "touchend"  : false,
  "direction" : "undetermined"
};

function touchHandler(e) {
  var touch;
  if (typeof e !== 'undefined'){
    // e.preventDefault();
    if (typeof e.touches !== 'undefined') {
      touch = e.touches[0];
      switch (e.type) {
        case 'touchstart':
        case 'touchmove':
          touches[e.type].x = touch.pageX;
          touches[e.type].y = touch.pageY;
          break;
        case 'touchend':
          touches[e.type] = true;
          if (touches.touchstart.y > -1 && touches.touchmove.y > -1) {
            touches.direction = touches.touchstart.x < touches.touchmove.x ? "right" : "left";
            var swipeDist = Math.abs(touches.touchstart.x - touches.touchmove.x);

            if(touches.direction == 'left' && swipeDist > 100) {
              console.log('go to next page');
              nextPage();
            }
            else if(touches.direction == 'right' && swipeDist > 100) {
              console.log('go to prev page');
              prevPage();
            }
          }

          // Reset
          touches = {
            "touchstart": {"x":-1, "y":-1},
            "touchmove" : {"x":-1, "y":-1},
            "touchend"  : false,
            "direction" : "undetermined"
          };
          break;
        default:
          break;
      }
    }
  }
}
