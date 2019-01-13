/**
 * Stores the users wages.
 * @param {number} wage The user's wage per hour 
 */


const DONATIONS_URL = "https://www.ko-fi.com/ashaunthomas";
let wage;
let wageSetter = document.getElementById('wageSetter');
let input = document.getElementById("wage");
let UI_Inactive = document.getElementById("UI_Inactive");
let UI_Active = document.getElementById("UI_Active");
let deactivateButton = document.getElementById("deactivateButton");
let donationButton = document.getElementById("donationButton");
let isActive = false;

/**
 * Displays 1 of 2 possible UIs, depending on if a wage has
 * been set or not.
 */
window.onload = _ => {
    console.log("onload ran")
    chrome.storage.sync.get('wage', function(value) {
        if (isActive) {
            this.wage = value.wage;
            deactivateUI();
        }
        else {
            activateUI();
        }
    });
}

/**
 * Sets wage with given input, stores it into chrome storage.
 */
wageSetter.onclick = function() {
    let newWage = input.value;
    chrome.storage.sync.set({wage: newWage});
    chrome.tabs.executeScript({
        file: 'contentCrawler.js'
    });
    activateUI();
    // else {
    //     chrome.storage.sync.get('wage', (value) => {

    //     });
    // }
};

/**
 * Deactivates UI on button click
 */
deactivateButton.onclick = function() {
    deactivateUI();
}

/**
 * 
 */
donationButton.onclick = function() {
    console.log("Donations function ran");
    chrome.tabs.create({url: DONATIONS_URL});
}
  
/**
 * Calculates time from wages per hour.
 * @return String representation of time
 */
function calculateTime() {
    if (wage) {

    }
    else {
        console.error("[!] Wage not set, calculateTime function cannot run");
    }
}

function activateUI() {
    console.log("Activate ran")
    UI_Active.classList = '';
    UI_Inactive.classList = 'removed';
}

function deactivateUI() {
    console.log("Deactivate ran");
    UI_Inactive.classList = '';
    UI_Active.classList = 'removed';
    chrome.storage.sync.set({wage:'-1'});
}