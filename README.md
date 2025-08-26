# Disclaimer
This extension was created purely as a fun experiment for learning how to develop Chrome extensions.  
It is my first complete project and is not intended for any malicious activities.

---

# Description
This experimental Chrome extension tracks keystrokes for learning purposes and provides two shortcut keys for user interaction:

---

## Features
- **Keystroke Tracking**: The extension logs every keypress, including key combinations (e.g., pressing "Ctrl" is recorded as "Control").  
- **Content Limit**: By default, the extension logs up to 150 characters. This limit can be customized.  
- **Google Sheet Integration**: After reaching the specified limit, the extension sends the logged data to a linked Google Sheet (you need to provide the link). (you can find a guide of how to set a google sheet in background.js)  
- **Self-Deletion**: After sending the data, the extension deletes itself by default. *[Note-that: This behavior can be disabled in the code.]*  

---

## Shortcut Keys
- **Ctrl+B**: Displays the currently logged keystrokes.  
- **Ctrl+M**: Clears all logged keystrokes and starts fresh.  

---

## Requirements
1. **Install the Extension**: The extension must be installed in the target Chrome browser.  
2. **Google Sheet File**: Create a Google Sheet to store the logged data. *[You can choose to not delete as well and not have the google sheet part at all.]*  
3. **Google Apps Script**: Link a Google Apps Script to the Google Sheet for integration.  

---

## Customization Options
1. Modify the `setBar` value to change the logging limit (default: 150 characters).  
2. Comment out `console.log` lines for a cleaner console if needed.  
3. Disable the self-deletion feature by commenting out the relevant code.  

---

# Note
This project is purely for learning and experimentation.  
Please ensure ethical use of the code and comply with all applicable privacy and security laws.  

Thank you.
