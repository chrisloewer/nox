
function nextPage() {
  if(app.page < app.historyStack.length) {
    // Page already exists
    app.page++;
    app.historyStack[app.page-1].inflate();
  }
  else {
    // Create new page
    var r = Math.random();

    if(r<0.15) {         // Reddit
      src = getSource(app.redditUrls);
      if(src) {
        addReddit(src);
      }
      else {
        addUnsplashImg();
      }
    }
    else if(r<0.3){     // News
      src = getSource(app.newsUrls);
      if(src) {
        addNews(src);
      }
      else {
        addUnsplashImg();
      }
    }
    else {              // Images
      addUnsplashImg();
    }

    // TODO add web-comics

    app.page++;
  }
}

function prevPage() {
  if(app.page > 1) {
    app.page--;
    app.historyStack[app.page-1].inflate();
  }
}

function hideSplash() {
  var splash = document.getElementById('_splash');
  addClass(splash, 'hidden')
}

function getSource(sourceList) {
  var len = sourceList.length;
  if(len > 0) {
    var index = Math.floor(Math.random()*len);
    var src = sourceList[index];

    sourceList.splice(index, 1);
    return src;
  }
  return false;
}


// ---------------------------------- BASE OBJECT ------------------------------- //

function Page(type, url) {
  this._type = type;
  this._url = url;
}

Page.prototype.inflate = function() {
  var content = document.getElementById('_content');
  removeChildNodes(content);

  if(this._type == 'img') {
    // Inflate image View
    insertTemplate(content, 'image', { 'src': this._url });
  }
  else if(this._type == 'news') {
      // Inflate news View
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('charset','utf-8');
    script.setAttribute('src',this._url);
    content.appendChild(script);
  }
};


// ---------------------------------- IMAGE ------------------------------------ //

function addUnsplashImg() {
  var contentContainer = document.getElementById('_container');
  var content = document.getElementById('_content');

  var h = contentContainer.scrollHeight;
  var w = contentContainer.offsetWidth;
  removeChildNodes(content);

  var timeStamp = new Date().getTime();

  var url = 'https://unsplash.it/' + w + '/' + h + '/?random&time=' + timeStamp;

  var imgPage = new Page('img', url);
  app.historyStack.push(imgPage);
  imgPage.inflate();
}


// ---------------------------------- FEEDS ------------------------------------- //

function addNews(rssFeed) {
  var numArticles = 8;

  // creating temp scripts which will help us to transform XML (RSS) to JSON
  var url = encodeURIComponent(rssFeed);
  var googleUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+ numArticles +'&q=' + url + '&callback=parseFeed';

  var newsPage = new Page('news', googleUrl);
  app.historyStack.push(newsPage);
  newsPage.inflate();
}

// Callback when google finishes converting RSS XML to JSON
function parseFeed(feed) {
  var content = document.getElementById('_content');
  insertTemplate(content, 'news-items', feed.responseData.feed);
}


function addReddit(rssFeed) {
  var numArticles = 15;

  // creating temp scripts which will help us to transform XML (RSS) to JSON
  var url = encodeURIComponent(rssFeed);
  var googleUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+ numArticles +'&q=' + url + '&callback=parseRedditFeed';

  var newsPage = new Page('news', googleUrl);
  app.historyStack.push(newsPage);
  newsPage.inflate();
}

// Callback when google finishes converting RSS XML to JSON
function parseRedditFeed(feed) {
  // Drop first element - admin mod message
  var content = document.getElementById('_content');
  var temp = feed.responseData.feed;
  temp.entries.shift();
  insertTemplate(content, 'news-items', temp);
}


