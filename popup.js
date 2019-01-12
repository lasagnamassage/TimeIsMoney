/**
 * Stores the users wages.
 * @param {number} wage The user's wage per hour 
 */

let wage;
let wageSetter = document.getElementById('wageSetter');
let input = document.getElementById("wage");
let UI_Inactive = document.getElementById("UI_Inactive");
let UI_Active = document.getElementById("UI_Active");
let deactivateButton = document.getElementById("deactivateButton");
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

deactivateButton.onclick = function() {
    deactivateUI();
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