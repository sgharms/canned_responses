const MENU_PREFIX = "CANNED_REPONSE_CONTEXT_MENU-";

var _CANNED_RESPONSE_REGISTRY = {
}

var _CANNED_RESPONSES = [
  ["Alpha", "Alpha body"],
  ["Beta", "Beta body"],
];

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  chrome.tabs.executeScript(details.tabId, {
    file: "canned_response.js"
  }, () => {
    // Create top-level menu
    var parentMenuId = chrome.contextMenus.create({
      id: MENU_PREFIX + details.tabId,
      title: "Canned Response",
      contexts: ["editable"],
      documentUrlPatterns: [ "*://*.linkedin.com/messaging/*" ]
    });

    // Create a canned responses menu
    _CANNED_RESPONSES.forEach((response, i) => {
      var id = chrome.contextMenus.create({
        title: response[0],
        parentId: parentMenuId,
        id: MENU_PREFIX + details.tabId + i,
        contexts: ["editable"],
        documentUrlPatterns: [ "*://*.linkedin.com/messaging/*" ]
      })
      _CANNED_RESPONSE_REGISTRY[id] = response[1];
    });

    chrome.tabs.sendMessage(details.tabId, { initialize_placeholder: "Canned Responses Ready To Go!" })
  })
}, {
  url: [{ "hostContains": "linkedin.com", "pathPrefix": "/messaging" }]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  var boilerplate = _CANNED_RESPONSE_REGISTRY[info.menuItemId];
  if (boilerplate) {
    // "Sends a single message to the content script(s) in the specified tab,
    // with an optional callback to run when a response is sent back."
    chrome.tabs.sendMessage(tab.id, { canned_response: boilerplate })
  }
});
