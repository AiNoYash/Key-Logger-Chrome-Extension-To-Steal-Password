console.log("background script loaded");//comment it out if not needed

// background.js (Service Worker in Manifest V3)
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['storedIn'], (result) => {
    if (result.storedIn === undefined) {
      chrome.storage.local.set({ storedIn: "" });
    }
  });
});


chrome.commands.onCommand.addListener((command) => {
  if (command === "delete") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // console.log("clear text command is triggered");
      chrome.tabs.sendMessage(tabs[0].id, { type: "clearstr" });
    });
  }

  if (command === "show") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // console.log("show command is triggered");
      chrome.tabs.sendMessage(tabs[0].id, { type: "showstr" });
    });
  }
});
//comment out entire below section if google sheets are not used
//your extension will also not be removed if you do this
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "completion") {
    console.log("Completion message received", msg.string); // Comment it out if not needed
    //check out discription below to set up a google sheet
    const url = ""; // Replace with your Web App URL
    const data = {
      name: msg.string,
      message: "Hello, Google Sheet!"
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(result => {
        console.log("Success:", result);

        // Uninstall the extension after successful execution
        chrome.management.uninstallSelf({
          showConfirmDialog: false // Silently uninstall without user prompt
        });

        sendResponse({ status: "completed", result: result });
      })
      .catch(error => {
        console.error("Error:", error);

        sendResponse({ status: "error", error: error.message });
      });

    return true;
  }
});


// To configure a sheet file
//follow along
//make a google sheet file
//go to extensions
//copy paste below snipet:
// ----------------------------------------
// function doPost(e) {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//   const data = JSON.parse(e.postData.contents);

//   // Append data to the sheet
//   sheet.appendRow([data.name, data.message]);

//   return ContentService.createTextOutput(
//     JSON.stringify({ status: "success" })
//   ).setMimeType(ContentService.MimeType.JSON);
// }
//-----------------------------------------
//go to Deploy->New Deployment
//select type as "web app"
//exicute as: yourEmail
//who has access: Anyone, even those without google account
//deploy
//authorize with your gmail (if you havent already)
//copy web app link
// paste it in const url