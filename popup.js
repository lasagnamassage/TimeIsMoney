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