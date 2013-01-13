/*global chrome,window document*/
(function(){
  "use strict";
  /**
   use Manifest of webRequest, webBlockingRequest, experimental
    you need change setting of Experimental API on chrome://flags
  */
  // chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  //     details.type == "main_frame" && console.log(details);
  //   },
  //   {urls: ["<all_urls>"]},
  //   ["blocking", "requestHeaders"]
  // );

  // Called when the user clicks on the browser action.
  var isShow = false,
      isLoaded = false;


  chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.tabs.insertCSS(null, {file:"css/bootstrap.min.css"});
    chrome.tabs.insertCSS(null, {file:"css/urlparams.css"});
    chrome.tabs.executeScript(null, {file:"js/jquery.js"});
    chrome.tabs.executeScript(null, {file:"js/bootstrap.min.js"});
    chrome.tabs.executeScript(null, {file:"js/handlebars.js"});
    chrome.tabs.executeScript(null, {file:"js/main.js"});

  });

})();

