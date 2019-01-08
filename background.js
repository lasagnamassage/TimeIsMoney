/**
 * Runs while extension is turned on.
 * This is where we check for dollar amounts and append
 * the necessary elements.
 */

const accepted_merchants_list = [
    'www.amazon.com',
    'www.etsy.com',
    'www.redbubble.com',
    'www.wayfair.com'
];

let rules = [];

// for(let i = 0; i < accepted_merchants_list.length; i++) {
//     rules.push(new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostEquals: accepted_merchants_list[i]}}));
// }

chrome.runtime.onInstalled.addListener(function() {
    // add an action here
    console.log("Hello from the console!")
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: "www.amazon.com"}
            })],
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
