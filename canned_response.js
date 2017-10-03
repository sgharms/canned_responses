console.log("running");
var _CANNED_RESPONSE_ACTIVE_INPUT;

chrome.runtime.onMessage.addListener( (message) => {
  _CANNED_RESPONSE_ACTIVE_INPUT.value = message.canned_response;
});

document.querySelector("input[type='text']").addEventListener('focus', e => _CANNED_RESPONSE_ACTIVE_INPUT = e.target);
