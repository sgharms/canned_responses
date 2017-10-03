chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {
        code: 'alert("razzle")'
    });
}, {
  url: [{ "hostContains": "stevengharms.com" }]
});
