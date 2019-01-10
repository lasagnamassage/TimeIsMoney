/**
 * Stores the users wages.
 * @param {number} wage The user's wage per hour 
 */

let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

function changeColor(temp) {
    let data = temp;
    chrome.storage.sync.set({color: data}, _ => {
        console.log("Set color to " + data);
    });
}