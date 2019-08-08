/**
 * Runs while extension is turned on.
 * This is where we check for dollar amounts and append
 * the necessary elements.
 */

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get('wage', function(value) {
        //console.log(value);
        new chrome.declarativeContent.ShowPageAction();
    });
});

chrome.tabs.onUpdated.addListener( function(tabID, changeInfo, tab) {
});