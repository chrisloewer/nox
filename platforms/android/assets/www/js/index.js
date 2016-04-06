

var app = {
  initialize: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    setTimeout(function() {
      hideSplash();
      nextPage();
    }, 1200);
  },

  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);
  },
  historyStack: [],
  page: 0,
  newsUrls: [
    'http://feeds.bbci.co.uk/news/world/rss.xml',
    'https://medium.com/feed/tech-talk',
    'http://www.engadget.com/rss.xml',
    'http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml',
    'http://feeds.abcnews.com/abcnews/topstories'
  ],
  redditUrls: [
    'https://www.reddit.com/r/todayilearned/.rss',
    'https://www.reddit.com/r/worldnews/.rss',
    'https://www.reddit.com/r/mildlyinteresting/.rss',
    'https://www.reddit.com/r/science/.rss',
    'https://www.reddit.com/r/funny/.rss'
  ]
};

app.initialize();

window.onload = function() {

  document.addEventListener('touchstart', touchHandler, false);
  document.addEventListener('touchmove', touchHandler, false);
  document.addEventListener('touchend', touchHandler, false);
  document.addEventListener('click', touchHandler, false);
  document.addEventListener('keyup', keyHandler, false);
};


// ------------------------------------ KEY EVENT HANDLERS ----------------------------------- //

function keyHandler(e) {

  switch(e.keyCode) {
    case 37:  // Left Key
      prevPage();
      break;
    case 39:  // Right Key
      nextPage();
      break;
  }
}


// ------------------------------------ TOUCH EVENT HANDLERS --------------------------------- //

touches = {
  "touchstart": {"x":-1, "y":-1},
  "touchmove" : {"x":-1, "y":-1},
  "touchend"  : false,
  "direction" : "undetermined"
};

var minTouchDistance = 100;

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

            if(touches.direction == 'left' && swipeDist > minTouchDistance) {
              nextPage();
            }
            else if(touches.direction == 'right' && swipeDist > minTouchDistance) {
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
