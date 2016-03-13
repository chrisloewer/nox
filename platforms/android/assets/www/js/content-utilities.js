
function nextPage() {
  if(app.page < app.historyStack.length) {
    var content = document.getElementById('_content');
    app.page++;

    removeChildNodes(content);
    content.appendChild(app.historyStack[app.page-1]);
  }
  else {
    setUnsplashImg();
    app.page++;
  }
}

function prevPage() {

  if(app.page > 1) {
    var content = document.getElementById('_content');
    app.page--;

    removeChildNodes(content);
    content.appendChild(app.historyStack[app.page-1]);
  }
}

function setUnsplashImg() {
  var contentContainer = document.getElementById('_container');
  var content = document.getElementById('_content');

  var h = contentContainer.scrollHeight;
  var w = contentContainer.offsetWidth;
  removeChildNodes(content);

  var timeStamp = new Date().getTime();

  //var url = 'https://source.unsplash.com/category/' + category +'/'+ w +'x'+ h + '/?time=' + timeStamp;
  //var url = 'https://source.unsplash.com/random/' + w +'x'+ h + '/?time=' + timeStamp;
  //var url = 'https://unsplash.it/'+ w + '/' + h + '/?random';
  var url = 'https://unsplash.it/'+ w + '/' + h + '/?random&time=' + timeStamp;
  var image = document.createElement('img');
  image.src = url;
  image.onload = function() {
    content.appendChild(image);
  };

  app.historyStack.push(image);

  return url;
}

function hideSplash() {
  var splash = document.getElementById('_splash');
  addClass(splash, 'hidden')
}