var _CANNED_RESPONSE_ACTIVE_INPUT;
var _CANNED_RESPONSE_INPUT_ELEMENT = "textarea";
var _CANNED_RESPONES_RUNTIME_EVENTS_BOUND;

document.getElementsByTagName(_CANNED_RESPONSE_INPUT_ELEMENT)[0].addEventListener('focus', e => _CANNED_RESPONSE_ACTIVE_INPUT = e.target)

if (!_CANNED_RESPONES_RUNTIME_EVENTS_BOUND) {
  chrome.runtime.onMessage.addListener(message => {
    if (message.initialize_placeholder) {
      document.getElementsByTagName(_CANNED_RESPONSE_INPUT_ELEMENT)[0].setAttribute("placeholder", message.initialize_placeholder);
      return;
    }
    _CANNED_RESPONSE_ACTIVE_INPUT.value += message.canned_response;
  });
  _CANNED_RESPONES_RUNTIME_EVENTS_BOUND = true;
}
