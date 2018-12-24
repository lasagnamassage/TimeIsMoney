/**
 * Runs while extension is turned on.
 * This is where we check for dollar amounts and append
 * the necessary elements.
 */
chrome.runtime.onInstalled.addListener(function() {
    // add an action here
});


/**
 * Stores the users wages.
 * @param {number} wage The user's wage per hour 
 */
function setHourlyWage(wage) {
    chrome.storage.sync.set({wage: wage}, () => {
        console.log(`wage set to ${wage}`);
    });
}
