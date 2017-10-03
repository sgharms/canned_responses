chrome.webNavigation.onCompleted.addListener(function(details) {
  chrome.tabs.executeScript(details.tabId, {
	file: "canned_response.js"
  });
}, {
  url: [{ "hostContains": "stevengharms.com" }]
});
