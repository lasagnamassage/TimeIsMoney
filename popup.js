/**
 * Stores the users wages.
 * @param {number} wage The user's wage per hour 
 */

let wage;
let wageSetter = document.getElementById('wageSetter');
let input = document.getElementById("wage");

chrome.storage.sync.get('wage', function(value) {
    if (value) {
        this.wage = value;
    }
});

wageSetter.onclick = function() {
    let newWage = input.value;
    console.log("Wagesetter clicked with input: " + newWage);
    chrome.storage.sync.set({wage: newWage});
    chrome.storage.sync.get('wage', (value) => {
        console.log("value set: " + value.wage);
        chrome.tabs.executeScript({
            file: 'contentCrawler.js'
          });
    });
};
  
function calculateTime() {
    if (wage) {

    }
    else {
        console.error("[!] Wage not set, calculateTime function cannot run");
    }
}