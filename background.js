/**
 * Runs while extension is turned on.
 * This is where we check for dollar amounts and append
 * the necessary elements.
 */

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: "www.amazon.com"}
            })],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
    chrome.storage.sync.get('wage', function(value) {
        console.log(value);
    });
});
