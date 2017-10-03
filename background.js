chrome.webNavigation.onCompleted.addListener(function(details) {
  chrome.tabs.executeScript(details.tabId, {
	file: "canned_response.js"
  }, () => chrome.tabs.sendMessage(details.tabId, { magic_word: "ROMY ZOMIE" }, txt => alert("called me back: " + txt)) );
}, {
  url: [{ "hostContains": "stevengharms.com" }]
});
