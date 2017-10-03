chrome.runtime.onMessage.addListener( (message, sender, cb) => {
  alert(message.magic_word);
  cb(document.querySelector("h1.post-title").innerText);
});
