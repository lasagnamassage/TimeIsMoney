/**
 * Stores the users wages.
 * @param {number} wage The user's wage per hour 
 */

let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };

// changeColor.addEventListener('click', _ => {
//     data = '#ff0000';
//     chrome.storage.sync.set({color: data}, _ => {
//         console.log("Set color to " + data);
//     });
//     chrome.storage.sync.get('color', function(data) {
//         changeColor.style.backgroundColor = data.color;
//         changeColor.setAttribute('value', data.color);
//     });
// });
