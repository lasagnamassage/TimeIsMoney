/**
 * Runs while extension is turned on.
 * This is where we check for dollar amounts and append
 * the necessary elements.
 */
chrome.runtime.onInstalled.addListener(function() {
    // add an action here
    console.log("Hello from the console!")
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'amazon.com'},
            pageUrl: {hostEquals: 'ebay.com'},
            pageUrl: {hostEquals: 'amazon.com'},
            pageUrl: {hostEquals: 'redbubble.com'},
            })
            ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});


/**
 * Stores the users wages.
 * @param {number} wage The user's wage per hour 
 */
function setHourlyWage() {
    let wage = document.getElementById('mywage').innerHTML;
    console.log(`wage set to ${wage}`);
    chrome.storage.sync.set({wage: wage}, () => {
        console.log(`wage set to ${wage}`);
    });
}
